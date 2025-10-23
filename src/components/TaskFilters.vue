<template>
  <!-- Inneholder søkefelt og filter for oppgavestatus -->
  <div class="flex flex-col sm:flex-row gap-2 mb-6">
    <!-- Søkefelt for å filtrere oppgaver etter navn -->
    <input
      v-model="localSearch"
      type="text"
      placeholder="Søk etter oppgaver..."
      class="flex-1 border border-gray-400 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
    />

    <!-- Nedtrekksmeny for å vise alle, aktive eller ferdige oppgaver -->
    <select
      v-model="localFilter"
      class="border border-gray-400 rounded-lg px-3 py-2 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
      aria-label="Filtrer oppgaver etter status"
    >
      <option value="">Alle oppgaver</option>
      <option value="todo">Oppgaver</option>
      <option value="done">Fullførte oppgaver</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Lokal tilstand for søk og filter, oppdaterer forelderen ved endring
const props = defineProps({ search: String, statusFilter: String })
const emit = defineEmits(['update:search', 'update:statusFilter'])

const localSearch = ref(props.search)
const localFilter = ref(props.statusFilter)

watch(localSearch, val => emit('update:search', val))
watch(localFilter, val => emit('update:statusFilter', val))
</script>
