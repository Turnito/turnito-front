<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Fecha
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Hora de Apertura
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Hora de Cierre
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Intervalo (min)
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Turnos Disponibles
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="schedule in schedules" :key="schedule.id">
          <td class="px-6 py-4">{{ formatDate(schedule.date) }}</td>
          <td class="px-6 py-4">{{ schedule.openTime }}</td>
          <td class="px-6 py-4">{{ schedule.closeTime }}</td>
          <td class="px-6 py-4">{{ schedule.interval }}</td>
          <td class="px-6 py-4">{{ calculateAvailableSlots(schedule) }}</td>
          <td class="px-6 py-4">
            <button
              @click="editSchedule(schedule)"
              class="text-indigo-600 hover:text-indigo-900 mr-2"
            >
              Editar
            </button>
            <button @click="deleteSchedule(schedule.id)" class="text-red-600 hover:text-red-900">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useScheduleStore } from '@/stores/scheduleStore'
import { ref, watch } from 'vue'

const scheduleStore = useScheduleStore()
const schedules = ref(scheduleStore.schedules)

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

const calculateAvailableSlots = (schedule) => {
  const start = new Date(`2000-01-01T${schedule.openTime}:00`)
  const end = new Date(`2000-01-01T${schedule.closeTime}:00`)
  const duration = (end - start) / 60000
  return Math.floor(duration / schedule.interval)
}

watch(
  () => scheduleStore.schedules,
  (newSchedules) => {
    schedules.value = newSchedules
  }
)
const editSchedule = (schedule) => {
  scheduleStore.setScheduleSelected(schedule)
}
const deleteSchedule = (id) => {
  scheduleStore.deleteSchedule(id)
}
</script>
