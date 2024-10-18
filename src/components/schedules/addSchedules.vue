<template>
  <div class="bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Agregar Nueva Agenda</h2>
    <form @submit.prevent="addSchedule" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input
            v-model="newSchedule.date"
            type="date"
            id="date"
            required
            class="w-full px-3 py-2 border"
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
            class="w-full px-3 py-2 border"
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
            class="w-full px-3 py-2 border"
          />
        </div>
      </div>
      <div>
        <label for="interval" class="block text-sm font-medium text-gray-700 mb-1"
          >Intervalo (minutos)</label
        >
        <input
          v-model.number="newSchedule.interval"
          type="number"
          id="interval"
          required
          min="5"
          class="w-full px-3 py-2 border"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Agregar Agenda
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScheduleStore } from '@/stores/scheduleStore'

const store = useScheduleStore()

const newSchedule = ref({
  date: '',
  openTime: '',
  closeTime: '',
  interval: 30
})

const addSchedule = () => {
  store.addSchedule(newSchedule.value)
  newSchedule.value = { date: '', openTime: '', closeTime: '', interval: 30 }
}
</script>
