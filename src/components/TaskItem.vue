<template>
  <li
    class="flex items-center justify-between border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
  >
    <!-- Tittel og ferdigstatus -->
    <div class="flex items-center gap-3 flex-1">
      <input
        type="checkbox"
        :checked="task.status === 'done'"
        @change="$emit('toggle', task)"
        class="w-5 h-5 accent-blue-700 focus:ring-2 focus:ring-blue-400 cursor-pointer"
      />

      <!-- Redigerbar tittel som oppdateres ved endring -->
      <input
        v-model="editableTitle"
        @blur="saveEdit"
        class="flex-1 bg-transparent border-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base rounded-sm"
        :class="task.status === 'done' ? 'line-through text-gray-500' : ''"
      />
    </div>

    <!-- Knapp for å slette oppgaven -->
    <button
      @click="$emit('delete', task)"
      class="px-3 py-1 border border-red-600 text-red-700 font-medium rounded-lg hover:bg-red-600 hover:text-black transition text-sm"
    >
      Slett
    </button>
  </li>
</template>

<script setup>
import { ref, watch } from 'vue'

// Håndterer individuell oppgave med redigering, status og sletting
const props = defineProps({ task: Object })
const emit = defineEmits(['update', 'delete', 'toggle'])

const editableTitle = ref(props.task.title)

// Oppdaterer lokal tittel hvis oppgaven endres utenfra
watch(() => props.task.title, v => (editableTitle.value = v))

// Sender oppdatert tittel til forelderen ved endring
function saveEdit() {
  if (editableTitle.value.trim() !== props.task.title) {
    emit('update', { ...props.task, title: editableTitle.value.trim() })
  }
}
</script>
