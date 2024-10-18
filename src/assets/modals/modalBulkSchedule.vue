<template>
  <div
    v-if="showBulkScheduleModal"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Abrir Agendas Masivas</h2>
      <form @submit.prevent="createBulkSchedules" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="bulkStartDate" class="block text-sm font-medium text-gray-700 mb-1"
              >Fecha de Inicio</label
            >
            <input
              v-model="bulkSchedule.startDate"
              type="date"
              id="bulkStartDate"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="bulkEndDate" class="block text-sm font-medium text-gray-700 mb-1"
              >Fecha de Fin</label
            >
            <input
              v-model="bulkSchedule.endDate"
              type="date"
              id="bulkEndDate"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="bulkOpenTime" class="block text-sm font-medium text-gray-700 mb-1"
              >Hora de Apertura</label
            >
            <input
              v-model="bulkSchedule.openTime"
              type="time"
              id="bulkOpenTime"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="bulkCloseTime" class="block text-sm font-medium text-gray-700 mb-1"
              >Hora de Cierre</label
            >
            <input
              v-model="bulkSchedule.closeTime"
              type="time"
              id="bulkCloseTime"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div>
          <label for="bulkInterval" class="block text-sm font-medium text-gray-700 mb-1"
            >Intervalo entre Turnos (minutos)</label
          >
          <input
            v-model.number="bulkSchedule.interval"
            type="number"
            id="bulkInterval"
            required
            min="5"
            step="5"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Días de Cierre</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="day in daysOfWeek"
              :key="day.value"
              type="button"
              @click="toggleClosedDay(day.value)"
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                bulkSchedule.closedDays.includes(day.value)
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              ]"
            >
              {{ day.label }}
            </button>
          </div>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="showBulkScheduleModal"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            Crear Agendas
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useScheduleStore } from '@/stores/scheduleStore'
import { ref } from 'vue'

const scheduleStore = useScheduleStore()
const emit = defineEmits(['close'])

const showBulkScheduleModal = () => {
  emit('close')
}
const bulkSchedule = ref({
  startDate: '',
  endDate: '',
  openTime: '',
  closeTime: '',
  interval: 30,
  closedDays: []
})

const createBulkSchedules = () => {
  const start = new Date(bulkSchedule.value.startDate)
  const end = new Date(bulkSchedule.value.endDate)

  end.setDate(end.getDate() + 1)
  start.setDate(start.getDate() + 1)
  if (start >= end) {
    alert('La fecha de inicio debe ser anterior a la fecha de fin.')
    return
  }

  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const dayIndex = date.getDay()

    if (!bulkSchedule.value.closedDays.includes(dayIndex)) {
      const newSchedule = {
        id: Date.now() + date.getTime(),
        date: date.toISOString().split('T')[0],
        openTime: bulkSchedule.value.openTime,
        closeTime: bulkSchedule.value.closeTime,
        interval: bulkSchedule.value.interval
      }
      scheduleStore.addSchedule(newSchedule)
      console.log('Agenda turnos masivos data', newSchedule)
    }
  }

  showBulkScheduleModal()
}

const toggleClosedDay = (day) => {
  const index = bulkSchedule.value.closedDays.indexOf(day)
  if (index === -1) {
    bulkSchedule.value.closedDays.push(day)
  } else {
    bulkSchedule.value.closedDays.splice(index, 1)
  }
}
const daysOfWeek = [
  { label: 'Dom', value: 0 },
  { label: 'Lun', value: 1 },
  { label: 'Mar', value: 2 },
  { label: 'Mié', value: 3 },
  { label: 'Jue', value: 4 },
  { label: 'Vie', value: 5 },
  { label: 'Sáb', value: 6 }
]
</script>
