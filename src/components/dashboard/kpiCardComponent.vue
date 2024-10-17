<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-2">{{ kpi.title }}</h3>
    <div class="flex items-center">
      <component :is="kpi.icon" class="w-8 h-8 text-indigo-500 mr-3" />
      <div>
        <p class="text-3xl font-bold text-gray-900">{{ kpi.value }}</p>
        <p class="text-sm text-gray-500">{{ kpi.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['kpi'])
</script>
