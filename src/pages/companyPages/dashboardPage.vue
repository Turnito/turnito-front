<template>
  <div class="flex h-screen bg-gray-100 w-full">
    <main class="flex-1 overflow-x-hidden overflow-y-auto w-full">
      <div class="w-full px-6 py-8">
        <div class="flex justify-between items-center mb-6">
          <SearchBarComponent />
          <button
            class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <PlusIcon class="h-5 w-5 inline-block mr-1" />
            Agregar
          </button>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <div class="space-y-6">
            <KpiCardComponent v-for="kpi in kpis" :key="kpi.title" :kpi="kpi" />
          </div>
          <upcomingAppointmentComponent :appointments="upcomingAppointments" />
          <div class="space-y-6">
            <IncomeChartComponent :data="[500, 800, 1200, 1000, 1500, 1800, 2000]" />
            <ClientSatisfactionComponent :clientSatisfaction="clientSatisfaction" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import upcomingAppointmentComponent from '@/components/dashboard/upcomingAppoiments.vue'
import { PlusIcon } from 'lucide-vue-next'
import SearchBarComponent from '@/components/sidebar/searchBarComponent.vue'
import KpiCardComponent from '@/components/dashboard/kpiCardComponent.vue'
import IncomeChartComponent from '@/components/dashboard/incomeChartComponent.vue'
import ClientSatisfactionComponent from '@/components/dashboard/clientSatisfactionComponent.vue'
import { UsersIcon } from 'lucide-vue-next'
import { CalendarIcon } from 'lucide-vue-next'

const kpis = [
  {
    title: 'Turnos del Mes',
    value: '245',
    description: '15% más que el mes pasado',
    icon: CalendarIcon
  },
  {
    title: 'Clientes Nuevos',
    value: '30',
    description: '6 nuevos clientes esta semana',
    icon: UsersIcon
  }
]

const upcomingAppointments = [
  {
    id: 1,
    client: 'Juan Pérez',
    service: 'Corte de Cabello',
    date: 'Hoy a las 15:00',
    avatar: '/path/to/avatar1.jpg'
  },
  {
    id: 2,
    client: 'Ana González',
    service: 'Manicura',
    date: 'Mañana a las 10:00',
    avatar: '/path/to/avatar2.jpg'
  }
]

const clientSatisfaction = 85
</script>
