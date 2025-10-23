<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Lokale reaktive variabler
const email = ref('')
const password = ref('')
// Henter innloggingslogikk fra auth.js
const auth = useAuthStore()
const router = useRouter()

// Håndtering av innlogging
async function onSubmit() {
  await auth.login(email.value, password.value)
  router.push('/app')
}
</script>

<template>
  <main class="min-h-screen grid place-items-center p-6 bg-white/50">
    <form @submit.prevent="onSubmit" class="w-full max-w-sm space-y-3 p-6 border rounded-xl bg-white">
      <h1 class="text-3xl font-bold">Bruker</h1>
      <input v-model="email" type="email" placeholder="E-post" class="w-full border p-2 rounded" required />
      <input v-model="password" type="password" placeholder="Passord" class="w-full border p-2 rounded" required />
      <button :disabled="auth.loading"  class="w-full p-2 rounded font-semibold text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition disabled:opacity-60">
        {{ auth.loading ? 'Logger inn…' : 'Logg inn' }}
      </button>
      <p v-if="auth.error" class="text-red-600 text-sm">{{ auth.error }}</p>
    </form>
  </main>
</template>
