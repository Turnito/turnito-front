<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Satisfacción del Cliente</h3>
    <div class="flex items-center justify-center">
      <div class="relative w-32 h-32">
        <svg class="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#E5E7EB"
            stroke-width="3"
          />
          <path
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#10B981"
            stroke-width="3"
            :stroke-dasharray="`${clientSatisfaction}, 100`"
          />
        </svg>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <div class="text-3xl font-bold text-gray-800">{{ clientSatisfaction }}%</div>
        </div>
      </div>
    </div>
    <p class="text-center text-gray-600 mt-4">Satisfacción del Cliente</p>
  </div>
</template>

<script setup>
defineProps(['clientSatisfaction'])
</script>
