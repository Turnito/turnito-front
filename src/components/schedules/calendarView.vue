<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">{{ currentMonthYear }}</h2>
      <div>
        <button @click="previousMonth" class="mr-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
        <button @click="nextMonth" class="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
    <div class="grid grid-cols-7 gap-2">
      <div
        v-for="day in ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']"
        :key="day"
        class="text-center font-semibold text-gray-600"
      >
        {{ day }}
      </div>
      <div
        v-for="day in calendarDays"
        :key="day.date"
        class="border rounded-lg p-2 h-32 overflow-y-auto"
      >
        <div class="text-right text-gray-500 text-sm">{{ day.dayOfMonth }}</div>
        <div v-if="day.schedule" class="mt-1">
          <div class="text-xs font-semibold text-indigo-600">
            {{ formatTimeRange(day.schedule) }}
          </div>
          <div class="text-xs text-gray-600">
            {{ calculateAvailableSlots(day.schedule) }} turnos disponibles
          </div>
        </div>
        <div v-else class="mt-1 text-xs text-red-500">Cerrado</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useScheduleStore } from '@/stores/scheduleStore'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

const store = useScheduleStore()
const schedules = store.schedules

const currentDate = ref(new Date())

const currentMonthYear = computed(() => {
  const options = { year: 'numeric', month: 'long' }
  return currentDate.value.toLocaleDateString('es-ES', options)
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []

  // Add empty days for the start of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push({ date: null, dayOfMonth: '' })
  }

  // Add days of the month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    const dateString = date.toISOString().split('T')[0]
    const schedule = schedules.find((s) => s.date === dateString)
    days.push({ date: dateString, dayOfMonth: i, schedule })
  }

  return days
})

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const formatTimeRange = (schedule) => {
  return `${schedule.openTime} - ${schedule.closeTime}`
}

const calculateAvailableSlots = (schedule) => {
  const start = new Date(`2000-01-01T${schedule.openTime}:00`)
  const end = new Date(`2000-01-01T${schedule.closeTime}:00`)
  const duration = (end - start) / 60000 // duration in minutes
  return Math.floor(duration / schedule.interval)
}
</script>
