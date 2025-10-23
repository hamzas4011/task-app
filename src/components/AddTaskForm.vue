<template>
  <!-- Skjema for å legge til ny oppgave -->
  <form
    @submit.prevent="onSubmit"
    class="flex gap-2 mb-6"
    aria-label="Skjema for å legge til oppgave"
  >
    <!-- Tekstfelt for oppgavetittel -->
    <input
      v-model="newTitle"
      type="text"
      placeholder="Ny oppgave..."
      class="flex-1 border border-gray-400 rounded-lg px-3 py-2 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
      aria-required="true"
    />

    <!-- Knapp for å sende inn -->
    <button
      type="submit"
      class="px-4 py-2 border border-gray-400 rounded-lg text-gray-900 text-base hover:bg-gray-100 bg-white focus:outline-none focus:border-gray-600"
    >
      Legg til
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

// Oppretter event og lokal tilstand for input
const emit = defineEmits(['add-task'])
const newTitle = ref('')

// Sender ny oppgave til forelderen og tømmer feltet
function onSubmit() {
  if (!newTitle.value.trim()) return
  emit('add-task', newTitle.value.trim())
  newTitle.value = ''
}
</script>
