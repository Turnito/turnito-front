<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Gestión de Especialidades</h3>
    <form @submit.prevent="handleSpecialtySubmit" class="space-y-4">
      <div class="flex space-x-4">
        <input
          v-model="newSpecialty"
          type="text"
          placeholder="Nueva especialidad"
          class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          {{ editingSpecialtyId ? 'Actualizar' : 'Agregar' }}
        </button>
      </div>
    </form>
    <div class="mt-4">
      <h4 class="text-lg font-medium text-gray-700 mb-2">Especialidades existentes:</h4>
      <ul class="space-y-2">
        <li
          v-for="specialty in specialties"
          :key="specialty.id"
          class="flex items-center justify-between bg-gray-50 p-2 rounded"
        >
          <span>{{ specialty.name }}</span>
          <div>
            <button
              @click="editSpecialty(specialty)"
              class="text-indigo-600 hover:text-indigo-900 mr-2"
            >
              <Edit2Icon class="h-5 w-5" />
            </button>
            <button @click="deleteSpecialty(specialty.id)" class="text-red-600 hover:text-red-900">
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Edit2Icon, TrashIcon } from 'lucide-vue-next'

const specialties = ref([
  /*... tu lista de especialidades ...*/
])
const newSpecialty = ref('')
const editingSpecialtyId = ref(null)

const handleSpecialtySubmit = () => {
  if (editingSpecialtyId.value) {
    const index = specialties.value.findIndex((s) => s.id === editingSpecialtyId.value)
    specialties.value[index].name = newSpecialty.value
    editingSpecialtyId.value = null
  } else {
    specialties.value.push({ id: Date.now(), name: newSpecialty.value })
  }
  newSpecialty.value = ''
}

const editSpecialty = (specialty) => {
  editingSpecialtyId.value = specialty.id
  newSpecialty.value = specialty.name
}

const deleteSpecialty = (id) => {
  specialties.value = specialties.value.filter((specialty) => specialty.id !== id)
}
</script>
