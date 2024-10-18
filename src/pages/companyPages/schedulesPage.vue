<template>
  <div class="flex h-screen bg-gray-100 w-full">
    <!-- Main content -->
    <main class="flex-1 overflow-x-hidden overflow-y-auto">
      <div class="container mx-auto px-6 py-8">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-semibold text-gray-800">Gestión de Agendas</h1>
          <div class="space-x-2">
            <button
              @click="openBulkScheduleModal"
              class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
            >
              Abrir Agendas Masivas
            </button>
            <button
              @click="toggleView"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              {{ isCalendarView ? 'Vista de Lista' : 'Vista de Calendario' }}
            </button>
          </div>
        </div>

        <!-- Calendar View -->
        <div v-if="isCalendarView" class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">{{ currentMonthYear }}</h2>
            <div>
              <button
                @click="previousMonth"
                class="mr-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
              >
                <ChevronLeftIcon class="w-5 h-5" />
              </button>
              <button
                @click="nextMonth"
                class="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
              >
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
              <div v-else-if="day.date" class="mt-1 text-xs text-red-500">Cerrado</div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else>
          <!-- Add New Schedule Form -->
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Agregar Nueva Agenda</h2>
            <form @submit.prevent="addSchedule" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label for="date" class="block text-sm font-medium text-gray-700 mb-1"
                    >Fecha</label
                  >
                  <input
                    v-model="newSchedule.date"
                    type="date"
                    id="date"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label for="openTime" class="block text-sm font-medium text-gray-700 mb-1"
                    >Hora de Apertura</label
                  >
                  <input
                    v-model="newSchedule.openTime"
                    type="time"
                    id="openTime"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label for="closeTime" class="block text-sm font-medium text-gray-700 mb-1"
                    >Hora de Cierre</label
                  >
                  <input
                    v-model="newSchedule.closeTime"
                    type="time"
                    id="closeTime"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label for="interval" class="block text-sm font-medium text-gray-700 mb-1"
                  >Intervalo entre Turnos (minutos)</label
                >
                <input
                  v-model.number="newSchedule.interval"
                  type="number"
                  id="interval"
                  required
                  min="5"
                  step="5"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Agregar Agenda
              </button>
            </form>
          </div>

          <!-- Schedules List -->
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
                  <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(schedule.date) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ schedule.openTime }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ schedule.closeTime }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ schedule.interval }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ calculateAvailableSlots(schedule) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="editSchedule(schedule)"
                      class="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      @click="deleteSchedule(schedule.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Edit Schedule Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    >
      <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Editar Agenda</h2>
        <form @submit.prevent="updateSchedule" class="space-y-4">
          <div>
            <label for="editDate" class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input
              v-model="editingSchedule.date"
              type="date"
              id="editDate"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="editOpenTime" class="block text-sm font-medium text-gray-700 mb-1"
              >Hora de Apertura</label
            >
            <input
              v-model="editingSchedule.openTime"
              type="time"
              id="editOpenTime"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="editCloseTime" class="block text-sm font-medium text-gray-700 mb-1"
              >Hora de Cierre</label
            >
            <input
              v-model="editingSchedule.closeTime"
              type="time"
              id="editCloseTime"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label for="editInterval" class="block text-sm font-medium text-gray-700 mb-1"
              >Intervalo entre Turnos (minutos)</label
            >
            <input
              v-model.number="editingSchedule.interval"
              type="number"
              id="editInterval"
              required
              min="5"
              step="5"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Bulk Schedule Modal -->
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
              @click="showBulkScheduleModal = false"
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  CalendarIcon,
  UsersIcon,
  CreditCardIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next'

const menuItems = [
  { name: 'Dashboard', icon: ChartBarIcon, href: '#' },
  { name: 'Agendas', icon: CalendarIcon, href: '#' },
  { name: 'Clientes', icon: UsersIcon, href: '#' },
  { name: 'Facturación', icon: CreditCardIcon, href: '#' }
]

const newSchedule = ref({
  date: '',
  openTime: '',
  closeTime: '',
  interval: 30
})

const schedules = ref([
  { id: 1, date: '2023-05-15', openTime: '09:00', closeTime: '18:00', interval: 30 },
  { id: 2, date: '2023-05-16', openTime: '10:00', closeTime: '19:00', interval: 45 },
  { id: 3, date: '2023-05-17', openTime: '08:30', closeTime: '17:30', interval: 30 },
  { id: 4, date: '2023-05-18', openTime: '09:30', closeTime: '18:30', interval: 60 }
])

const showEditModal = ref(false)
const editingSchedule = ref({})
const isCalendarView = ref(false)
const currentDate = ref(new Date())
const showBulkScheduleModal = ref(false)

const bulkSchedule = ref({
  startDate: '',
  endDate: '',
  openTime: '',
  closeTime: '',
  interval: 30,
  closedDays: []
})

const daysOfWeek = [
  { label: 'Dom', value: 0 },
  { label: 'Lun', value: 1 },
  { label: 'Mar', value: 2 },
  { label: 'Mié', value: 3 },
  { label: 'Jue', value: 4 },
  { label: 'Vie', value: 5 },
  { label: 'Sáb', value: 6 }
]

const addSchedule = () => {
  const schedule = {
    id: Date.now(),
    ...newSchedule.value
  }
  schedules.value.push(schedule)
  newSchedule.value = {
    date: '',
    openTime: '',
    closeTime: '',
    interval: 30
  }
}

const editSchedule = (schedule) => {
  editingSchedule.value = { ...schedule }
  showEditModal.value = true
}

const updateSchedule = () => {
  const index = schedules.value.findIndex((s) => s.id === editingSchedule.value.id)
  if (index !== -1) {
    schedules.value[index] = { ...editingSchedule.value }
  }
  showEditModal.value = false
}

const deleteSchedule = (id) => {
  schedules.value = schedules.value.filter((s) => s.id !== id)
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

const toggleView = () => {
  isCalendarView.value = !isCalendarView.value
}

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
    const schedule = schedules.value.find((s) => s.date === dateString)
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

const openBulkScheduleModal = () => {
  showBulkScheduleModal.value = true
}

const toggleClosedDay = (day) => {
  const index = bulkSchedule.value.closedDays.indexOf(day)
  if (index === -1) {
    bulkSchedule.value.closedDays.push(day)
  } else {
    bulkSchedule.value.closedDays.splice(index, 1)
  }
}

const createBulkSchedules = () => {
  const start = new Date(bulkSchedule.value.startDate)
  const end = new Date(bulkSchedule.value.endDate)

  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    if (!bulkSchedule.value.closedDays.includes(date.getDay())) {
      const newSchedule = {
        id: Date.now() + date.getTime(),
        date: date.toISOString().split('T')[0],
        openTime: bulkSchedule.value.openTime,
        closeTime: bulkSchedule.value.closeTime,
        interval: bulkSchedule.value.interval
      }
      schedules.value.push(newSchedule)
    }
  }

  showBulkScheduleModal.value = false
}
</script>
