<template>
  <div class="space-y-4">
    <div v-for="staff in staffPerformance" :key="staff.id" class="flex items-center">
      <img :src="staff.avatar" :alt="staff.name" class="w-10 h-10 rounded-full mr-3">
      <div class="flex-grow">
        <div class="text-sm font-medium text-gray-700">{{ staff.name }}</div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-indigo-600 h-2.5 rounded-full" :style="{ width: `${staff.performance}%` }"></div>
        </div>
      </div>
      <div class="text-sm text-gray-500">{{ staff.performance }}%</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const staffPerformance = ref([
  { id: 1, name: 'Laura Martínez', performance: 95, avatar: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Pedro Sánchez', performance: 88, avatar: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Carmen Ruiz', performance: 92, avatar: '/placeholder.svg?height=40&width=40' },
  { id: 4, name: 'Javier Torres', performance: 85, avatar: '/placeholder.svg?height=40&width=40' },
])
</script>