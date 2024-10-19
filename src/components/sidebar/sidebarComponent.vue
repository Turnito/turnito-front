<template>
  <div
    :class="[
      'transition-all duration-300 ease-in-out flex flex-col',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
    class="h-screen bg-indigo-900 text-white"
  >
    <div class="flex-1 overflow-y-auto">
      <div class="p-4">
        <img
          v-if="isCollapsed"
          src="https://res.cloudinary.com/dn6dmzeqq/image/upload/v1727491478/logoPrincipe_qhmwyd.png"
          alt="Logo"
          class="w-8 h-8 mx-auto"
        />
        <div v-else class="flex items-center">
          <img
            src="https://res.cloudinary.com/dn6dmzeqq/image/upload/v1727491478/logoPrincipe_qhmwyd.png"
            alt="Logo"
            class="w-8 h-8 mr-2"
          />
          <h1 class="text-xl font-bold">Hair Salon CRM</h1>
        </div>
      </div>
      <nav class="mt-8">
        <div v-for="(item, index) in navItems" :key="index" class="mb-4">
          <button
            @click="navigateOrToggle(item)"
            :class="[
              'flex items-center w-full py-2 px-3 text-gray-300 hover:bg-indigo-700 rounded transition-colors duration-150',
              { 'justify-center': isCollapsed }
            ]"
          >
            <component :is="item.icon" :size="isCollapsed ? 24 : 20" />
            <span v-if="!isCollapsed" class="ml-3 flex-grow text-left">{{ item.name }}</span>
            <ChevronDown v-if="!isCollapsed && item.items && item.expanded" size="16" />
            <ChevronRight v-if="!isCollapsed && item.items && !item.expanded" size="16" />
          </button>
          <div v-if="!isCollapsed && item.items && item.expanded" class="mt-2 ml-6">
            <button
              v-for="(subItem, subIndex) in item.items"
              :key="subIndex"
              @click="navigate(subItem.routeName)"
              class="flex items-center w-full py-2 px-3 text-gray-300 hover:bg-gray-800 rounded transition-colors duration-150"
            >
              <component :is="subItem.icon" size="20" />
              <span class="ml-3">{{ subItem.name }}</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
    <div class="p-4">
      <button
        @click="toggleSidebar"
        :class="[
          'flex items-center justify-center w-full py-2 text-gray-300 hover:bg-indigo-700 bg-indigo-900 rounded transition-colors duration-150',
          { 'px-3': !isCollapsed }
        ]"
      >
        <ChevronLeft v-if="!isCollapsed" size="24" />
        <ChevronRight v-else size="24" />
        <span v-if="!isCollapsed" class="ml-3">Collapse</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChartBarIcon,
  CalendarIcon,
  UsersIcon,
  CreditCardIcon,
  Briefcase,
  Brush
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
const router = useRouter()
const isCollapsed = ref(false)
const navItems = ref([
  { name: 'Dashboard', icon: ChartBarIcon, routeName: 'dashboard-company' },
  { name: 'Agenda', icon: CalendarIcon, routeName: 'schedules' },
  { name: 'Clientes', icon: UsersIcon, routeName: 'client-management' },
  { name: 'Promos', icon: CreditCardIcon, routeName: 'promotion' },
  { name: 'Empleados', icon: Briefcase, routeName: 'employees' },
  { name: 'branding', icon: Brush, routeName: 'branding-customer' }
])

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleExpand = (item) => {
  if (item.items && !isCollapsed.value) {
    item.expanded = !item.expanded
  }
}
const navigateOrToggle = (item) => {
  if (item.items) {
    if (!isCollapsed.value) {
      item.expanded = !item.expanded
    }
  } else if (item.routeName) {
    navigate(item.routeName)
  }
}

const navigate = (routeName) => {
  router.push({ name: routeName })
}
</script>
