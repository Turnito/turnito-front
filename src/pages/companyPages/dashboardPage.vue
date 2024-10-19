<template>
  <div class="p-6 bg-gray-100 min-h-screen w-full">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-700">Citas por Mes</h2>
        </div>
        <div class="p-4">
          <AppointmentsChart />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-700">Ingresos</h2>
        </div>
        <div class="p-4">
          <RevenueChart />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-700">Servicios Más Populares</h2>
        </div>
        <div class="p-4">
          <TopServices />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-700">Tasa de Retención de Clientes</h2>
        </div>
        <div class="p-4">
          <ClientRetentionRate />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-700">Próximas Citas</h2>
        </div>
        <div class="p-4">
          <UpcomingAppointments />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-700">Rendimiento del Personal</h2>
        </div>
        <div class="p-4">
          <StaffPerformance />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AppointmentsChart from '@/components/dashboard/AppointmentsChart.vue'
import RevenueChart from '@/components/dashboard/RevenueChart.vue'
import TopServices from '@/components/dashboard/TopServices.vue'
import ClientRetentionRate from '@/components/dashboard/ClientRetentionRate.vue'
import UpcomingAppointments from '@/components/dashboard/upcomingAppointments.vue'
import StaffPerformance from '@/components/dashboard/StaffPerformance.vue'
</script>
