<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Próximos Turnos</h3>
    <ul class="space-y-4">
      <li
        v-for="appointment in appointments"
        :key="appointment.id"
        class="flex items-center justify-between"
      >
        <div class="flex items-center">
          <img :src="appointment.avatar" alt="" class="w-10 h-10 rounded-full mr-3" />
          <div>
            <p class="font-semibold text-gray-700">{{ appointment.client }}</p>
            <p class="text-sm text-gray-500">{{ appointment.service }}</p>
          </div>
        </div>
        <p class="text-sm text-gray-600">{{ appointment.date }}</p>
      </li>
    </ul>
    <button
      class="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
    >
      <PlusIcon class="h-5 w-5 inline-block mr-1" />
      Nuevo Turno
    </button>
  </div>
</template>

<script setup>
defineProps(['appointments'])
import { PlusIcon } from 'lucide-vue-next'
</script>
