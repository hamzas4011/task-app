// Axios-klient for kommunikasjon med API-et.
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

// Oppretter Axios-instans med API-baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://taskapi.app01.transportsys.no',
  withCredentials: false
})

// Fanger opp 401 (utløpt token) og prøver å fornye
api.interceptors.request.use((config) => {
  try {
    const auth = useAuthStore()
    if (auth?.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`
    } else {
      const at = sessionStorage.getItem('access_token')
      if (at) config.headers.Authorization = `Bearer ${at}`
    }
  } catch { }
  return config
})


let refreshing = null
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const auth = useAuthStore()
        refreshing = refreshing || auth.refreshIfPossible()
        const newAccess = await refreshing
        refreshing = null
        original.headers.Authorization = `Bearer ${newAccess}`
        return api(original)
      } catch (e) {
        refreshing = null
        const auth = useAuthStore()
        auth.logout()
      }
    }
    return Promise.reject(error)
  }
)

export default api
