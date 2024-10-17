<template>
  <aside class="w-16 bg-indigo-900 text-white">
    <div class="p-4">
      <div
        class="w-8 h-8 bg-white text-indigo-900 rounded-md flex items-center justify-center font-bold text-xl"
      >
        P
      </div>
    </div>
    <nav class="mt-8">
      <a
        v-for="item in menuItems"
        :key="item.name"
        :href="item.href"
        class="flex items-center justify-center p-4 text-indigo-300 hover:bg-indigo-800 hover:text-white transition-colors duration-200"
      >
        <component :is="item.icon" class="w-6 h-6" />
      </a>
    </nav>
  </aside>
</template>

<script setup>
defineProps(['menuItems'])
</script>
