import { defineStore } from 'pinia'
import api from '../api/client'

const ACCESS_KEY = 'access_token'
const REFRESH_KEY = 'refresh_token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: '',
    refreshToken: '',
    loading: false,
    error: ''
  }),

  getters: {
    isAuthed: (s) => !!s.accessToken && !!s.user
  },

  actions: {
    // Sjekker om bruker allerede er innlogget (brukes ved oppstart)
    async checkAuth() {
      const at = sessionStorage.getItem(ACCESS_KEY)
      const rt = sessionStorage.getItem(REFRESH_KEY)
      if (at) {
        this.accessToken = at
        this.refreshToken = rt || ''
        try {
          const me = await api.get('/auth/me')
          this.user = me.data
        } catch {
          this.logout()
        }
      }
    },

    // Logger inn og henter brukerdata
    async login(email, password) {
      this.loading = true
      this.error = ''
      try {
        const { data } = await api.post('/auth/login', { email, password })
        this.setTokens(data.access_token, data.refresh_token)

        const me = await api.get('/auth/me')
        this.user = me.data
      } catch (e) {
        this.error = e?.response?.data?.message || 'Innlogging feilet'
        throw e
      } finally {
        this.loading = false
      }
    },

    // Fornyer token ved behov
    async refreshIfPossible() {
      if (!this.refreshToken) throw new Error('Ingen refresh token')
      const { data } = await api.post('/auth/refresh', { refresh_token: this.refreshToken })
      this.setTokens(data.access_token, data.refresh_token || this.refreshToken)
      return data.access_token
    },

    setTokens(access, refresh = '') {
      this.accessToken = access
      this.refreshToken = refresh
      sessionStorage.setItem(ACCESS_KEY, access)
      if (refresh) sessionStorage.setItem(REFRESH_KEY, refresh)
    },

    logout() {
      this.user = null
      this.accessToken = ''
      this.refreshToken = ''
      sessionStorage.removeItem(ACCESS_KEY)
      sessionStorage.removeItem(REFRESH_KEY)
    }
  }
})
