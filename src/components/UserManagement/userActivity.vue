<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <div class="p-4 border-b">
      <h4 class="text-lg font-semibold text-gray-700">Registro de Actividad de Usuarios</h4>
    </div>
    <ul class="divide-y divide-gray-200">
      <li v-for="activity in activities" :key="activity.id" class="p-4">
        <div class="flex items-center">
          <img
            class="h-10 w-10 rounded-full mr-4"
            :src="activity.userAvatar"
            :alt="activity.userName"
          />
          <div>
            <p class="text-sm font-medium text-gray-900">{{ activity.userName }}</p>
            <p class="text-sm text-gray-500">{{ activity.action }}</p>
          </div>
          <span class="ml-auto text-sm text-gray-500">{{ activity.timestamp }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  activities: Array
})
</script>
