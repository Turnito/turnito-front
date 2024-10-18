<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">
      {{ editingProfessional ? 'Editar Profesional' : 'Agregar Nuevo Profesional' }}
    </h3>
    <form @submit.prevent="handleProfessionalSubmit" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            v-model="newProfessional.name"
            type="text"
            id="name"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="newProfessional.email"
            type="email"
            id="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            v-model="newProfessional.phone"
            type="tel"
            id="phone"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Días de trabajo</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="day in workDays"
            :key="day.value"
            type="button"
            @click="toggleWorkDay(day.value)"
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              newProfessional.workDays.includes(day.value)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ day.label }}
          </button>
        </div>
      </div>
      <div>
        <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
        <textarea
          v-model="newProfessional.bio"
          id="bio"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
      >
        {{
          employeeStore.professionalSelected !== null
            ? 'Actualizar Profesional'
            : 'Agregar Profesional'
        }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { useEmployeeStore } from '@/stores/employeeStore'
import { ref, watch } from 'vue'

const employeeStore = useEmployeeStore()
const newProfessional = ref({
  name: '',
  email: '',
  phone: '',
  workDays: [],
  bio: ''
})

const editingProfessional = ref(null)

const workDays = [
  { label: 'Lun', value: 1 },
  { label: 'Mar', value: 2 },
  { label: 'Mié', value: 3 },
  { label: 'Jue', value: 4 },
  { label: 'Vie', value: 5 },
  { label: 'Sáb', value: 6 },
  { label: 'Dom', value: 0 }
]

const toggleWorkDay = (day) => {
  const index = newProfessional.value.workDays.indexOf(day)
  if (index === -1) {
    newProfessional.value.workDays.push(day)
  } else {
    newProfessional.value.workDays.splice(index, 1)
  }
  newProfessional.value.workDays.sort((a, b) => a - b)
}
watch(
  () => employeeStore.professionalSelected,
  (newVal) => {
    if (newVal) {
      newProfessional.value = { ...newVal }
    }
  }
)
const handleProfessionalSubmit = () => {
  console.log('Employee data', newProfessional.value)
  if (employeeStore.professionalSelected) {
    employeeStore.updateProfessional(newProfessional.value)
    employeeStore.professionalSelected = null
  } else {
    employeeStore.setNewProfessional(newProfessional.value)
  }

  newProfessional.value = {
    name: '',
    email: '',
    phone: '',
    workDays: [],
    bio: ''
  }
}
</script>
