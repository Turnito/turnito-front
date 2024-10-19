<template>
  <div class="text-center">
    <div class="text-4xl font-bold text-indigo-600">{{ retentionRate }}%</div>
    <div class="text-gray-500 mt-2">Tasa de retención de clientes</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const retentionRate = ref(85)
</script>