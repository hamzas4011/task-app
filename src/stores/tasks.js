import { defineStore } from 'pinia'
import api from '../api/client'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    items: [],
    total: 0,
    loading: false,
    error: ''
  }),

  actions: {
    // Henter alle oppgaver fra API
    async fetchAll(params = { search: '', limit: 100, offset: 0 }) {
      this.loading = true
      this.error = ''
      try {
        const { data } = await api.get('/tasks', { params })
        this.items = data.items || []
        this.total = data.total ?? this.items.length
      } catch (e) {
        this.error = e?.response?.data?.message || 'Kunne ikke hente oppgaver'
      } finally {
        this.loading = false
      }
    },

    // Oppretter en ny oppgave
    async create({ title, description = '', status = 'todo' }) {
      const { data } = await api.post('/tasks', { title, description, status })
      this.items.unshift(data)
      this.total += 1
      return data
    },

    // Oppdaterer en oppgave (inkl. håndtering av konflikt via updatedAt)
    async update(id, changes) {
      const current = this.items.find(t => t.id === id)
      if (!current) throw new Error('Task ikke funnet')

      try {
        const payload = { ...changes, updatedAt: current.updatedAt }
        const { data } = await api.patch(`/tasks/${id}`, payload)
        const idx = this.items.findIndex(t => t.id === id)
        if (idx !== -1) this.items[idx] = data
        return data
      } catch (e) {
        if (e?.response?.status === 409) {
          const serverCurrent = e?.response?.data?.current
          throw { code: 'conflict', message: 'Outdated updatedAt', current: serverCurrent }
        }
        throw e
      }
    },

    // Sletter en oppgave
    async remove(id) {
      await api.delete(`/tasks/${id}`)
      this.items = this.items.filter(t => t.id !== id)
      this.total = Math.max(0, this.total - 1)
    }
  }
})
