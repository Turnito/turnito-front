<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Nombre
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Especialidad
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Contacto
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Días de trabajo
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="professional in professionals" :key="professional.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ professional.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ getSpecialtyName(professional.specialtyId) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">{{ professional.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ formatWorkDays(professional.workDays) }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button
              @click="editProfessional(professional)"
              class="text-indigo-600 hover:text-indigo-900 mr-2"
            >
              <Edit2Icon class="h-5 w-5" />
            </button>
            <button
              @click="deleteProfessional(professional.id)"
              class="text-red-600 hover:text-red-900"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Edit2Icon, TrashIcon } from 'lucide-vue-next'

const professionals = ref([
  /*... tu lista de profesionales ...*/
])

const getSpecialtyName = (id) => {
  // Implementar lógica para obtener el nombre de la especialidad basado en el ID
}

const formatWorkDays = (workDays) => {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  return workDays.map((day) => days[day]).join(', ')
}

const editProfessional = (professional) => {
  // Implementar lógica para editar profesional
}

const deleteProfessional = (id) => {
  // Implementar lógica para eliminar profesional
}
</script>
