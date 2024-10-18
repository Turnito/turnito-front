<template>
  <aside class="w-16 bg-indigo-900 text-white h-screen">
    <div class="p-4">
      <div
        class="w-8 h-8 bg-white text-indigo-900 rounded-md flex items-center justify-center font-bold text-xl"
      >
        P
      </div>
    </div>
    <nav class="mt-8">
      <transition name="fade"> </transition>
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="{ name: item.routeName }"
        class="flex items-center justify-center p-4 text-indigo-300 hover:bg-indigo-800 hover:text-white transition-colors duration-200"
      >
        <component :is="item.icon" class="w-6 h-6" />
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { CalendarIcon, UsersIcon, CreditCardIcon, ChartBarIcon, Briefcase } from 'lucide-vue-next'

const menuItems = [
  { name: 'Dashboard', icon: ChartBarIcon, routeName: 'dashboard-company' }, // Reemplazar si usas un icono de Lucide
  { name: 'Agenda', icon: CalendarIcon, routeName: 'schedules' },
  { name: 'Clientes', icon: UsersIcon, routeName: 'client-management' },
  { name: 'Promos', icon: CreditCardIcon, routeName: 'promotion' },
  { name: 'Empleados', icon: Briefcase, routeName: 'employees' }
]
</script>

<style>
.icon-class {
  width: 20px;
  height: 20px;
}
</style>
