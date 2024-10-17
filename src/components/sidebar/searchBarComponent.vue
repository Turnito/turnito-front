<template>
  <div class="relative w-64">
    <input
      type="text"
      placeholder="Buscar..."
      class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    />
    <div class="absolute left-3 top-2.5">
      <SearchIcon class="h-5 w-5 text-gray-400" />
    </div>
  </div>
</template>

<script setup>
import { SearchIcon } from 'lucide-vue-next'
</script>
