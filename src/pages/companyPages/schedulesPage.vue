<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-6 mt-5 ml-5">
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

    <AddSchedules v-if="!isCalendarView" />
    <ScheduleTable v-if="!isCalendarView" />
    <CalendarView v-if="isCalendarView" />
    <ModalBulkSchedule v-if="showBulkScheduleModal" @close="openBulkScheduleModal" />
  </div>
</template>

<script setup>
import ModalBulkSchedule from '@/assets/modals/modalBulkSchedule.vue'
import AddSchedules from '@/components/schedules/addSchedules.vue'
import CalendarView from '@/components/schedules/calendarView.vue'
import ScheduleTable from '@/components/schedules/scheduleTable.vue'
import { ref } from 'vue'

const isCalendarView = ref(false)
const showBulkScheduleModal = ref(false)
const openBulkScheduleModal = () => {
  showBulkScheduleModal.value = !showBulkScheduleModal.value
}
const toggleView = () => {
  isCalendarView.value = !isCalendarView.value
}
</script>
