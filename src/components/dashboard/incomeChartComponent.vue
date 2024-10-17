<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Ingresos por Día</h3>
    <canvas ref="incomeChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps(['data'])

const incomeChart = ref(null)

onMounted(() => {
  new Chart(incomeChart.value, {
    type: 'line',
    data: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Ingresos',
          data: props.data,
          borderColor: 'rgb(59, 130, 246)',
          tension: 0.1,
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.1)'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return '$' + value
            }
          }
        }
      }
    }
  })
})
</script>
