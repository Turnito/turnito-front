<template>
  <ul class="space-y-2">
    <li v-for="service in topServices" :key="service.id" class="flex justify-between items-center">
      <span class="text-gray-700">{{ service.name }}</span>
      <span class="text-gray-500">{{ service.count }} citas</span>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const topServices = ref([
  { id: 1, name: 'Corte de pelo', count: 120 },
  { id: 2, name: 'Tinte', count: 85 },
  { id: 3, name: 'Peinado', count: 70 },
  { id: 4, name: 'Tratamiento capilar', count: 50 },
  { id: 5, name: 'Manicura', count: 45 },
])
</script>