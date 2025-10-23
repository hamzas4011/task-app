// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TasksView from '../views/TasksView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginView },
    { path: '/app', component: TasksView },
    { path: '/', redirect: '/app' }
  ]
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.user && !auth.accessToken) {
    await auth.checkAuth()
  }
  if (to.path !== '/login' && !auth.isAuthed) return '/login'
  if (to.path === '/login' && auth.isAuthed) return '/app'
})

export default router
