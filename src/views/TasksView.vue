<template>
  <main class="min-h-screen bg-white flex flex-col items-center py-10 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Mine oppgaver</h1>
        <button
          @click="logout"
          class="text-sm px-4 py-2 border border-black text-black rounded-md hover:bg-gray-100 focus:ring-2 font-bold focus:ring-gray-300 transition"
        >
          Logg ut
        </button>
      </div>

      <!-- Filtrering + Legg til oppgave -->
      <TaskFilters v-model:search="search" v-model:statusFilter="statusFilter" />
      <AddTaskForm @add-task="addTask" />

      <!-- Oppgaveliste -->
      <ul class="space-y-3" role="list" aria-live="polite">
        <TaskItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggle="toggleDone"
          @update="saveEdit"
          @delete="deleteTask"
        />
      </ul>

      <!-- Ingen oppgaver -->
      <p v-if="!filteredTasks.length" class="text-gray-600 italic text-center mt-8">
        Ingen oppgaver funnet.
      </p>

      <!-- Bekreftelsesmelding -->
      <p v-if="notice" class="text-sm text-green-700 text-center mt-4 font-medium">
        {{ notice }}
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '../stores/tasks'
import { useAuthStore } from '../stores/auth'
import AddTaskForm from '../components/AddTaskForm.vue'
import TaskItem from '../components/TaskItem.vue'
import TaskFilters from '../components/TaskFilters.vue'

const router = useRouter()
const auth = useAuthStore()
const taskStore = useTaskStore()

const tasks = computed(() => taskStore.items)
const search = ref('')
const statusFilter = ref('')
const notice = ref('')

onMounted(() => taskStore.fetchAll())

const filteredTasks = computed(() =>
  tasks.value.filter(task => {
    const matchSearch = task.title.toLowerCase().includes(search.value.toLowerCase())
    const matchFilter = !statusFilter.value || task.status === statusFilter.value
    return matchSearch && matchFilter
  })
)
async function addTask(title) {
  await taskStore.create({ title, status: 'todo' })
  notice.value = 'Ny oppgave lagt til'
  setTimeout(() => (notice.value = ''), 2000)
}
async function toggleDone(task) {
  const next = task.status === 'done' ? 'todo' : 'done'
  await taskStore.update(task.id, { status: next })
}
async function saveEdit(task) {
  await taskStore.update(task.id, { title: task.title })
}
async function deleteTask(task) {
  await taskStore.remove(task.id)
  notice.value = 'Oppgaven ble slettet'
  setTimeout(() => (notice.value = ''), 2000)
}
function logout() {
  auth.logout()
  router.push('/login')
}
</script>
