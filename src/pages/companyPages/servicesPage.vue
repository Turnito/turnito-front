<template>
  <div class="flex h-screen bg-gray-100 w-full">

    <!-- Main content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">Gestión de Servicios</h2>

      <!-- Add/Edit Service Form -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          {{ editingService ? 'Editar Servicio' : 'Agregar Nuevo Servicio' }}
        </h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre del Servicio</label>
            <input
              v-model="newService.name"
              type="text"
              id="name"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
              <input
                v-model.number="newService.price"
                type="number"
                id="price"
                required
                min="0"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Duración (minutos)</label>
              <input
                v-model.number="newService.duration"
                type="number"
                id="duration"
                required
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Profesionales</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="professional in professionals"
                :key="professional.id"
                type="button"
                @click="toggleProfessional(professional)"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  newService.professionals.some(p => p.id === professional.id)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]"
              >
                {{ professional.name }}
              </button>
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            {{ editingService ? 'Actualizar Servicio' : 'Agregar Servicio' }}
          </button>
        </form>
      </div>

      <!-- Services List -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profesionales</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="service in services" :key="service.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <Scissors class="h-5 w-5 text-gray-400 mr-2" />
                  <span class="text-sm font-medium text-gray-900">{{ service.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ service.price.toFixed(2) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ service.duration }} min</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ service.professionals.map(p => p.name).join(', ') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editService(service)"
                  class="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  <Edit2Icon class="h-5 w-5" />
                </button>
                <button
                  @click="deleteService(service.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Scissors, Edit2Icon, TrashIcon } from 'lucide-vue-next'

const services = ref([
  { id: 1, name: 'Corte de pelo', price: 25, duration: 30, professionals: [{ id: 1, name: 'Ana' }, { id: 2, name: 'Carlos' }] },
  { id: 2, name: 'Tintura', price: 50, duration: 90, professionals: [{ id: 1, name: 'Ana' }, { id: 3, name: 'María' }] },
  { id: 3, name: 'Peinado', price: 35, duration: 45, professionals: [{ id: 2, name: 'Carlos' }, { id: 3, name: 'María' }] },
])

const professionals = ref([
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Carlos' },
  { id: 3, name: 'María' },
  { id: 4, name: 'Luis' },
])

const newService = ref({
  name: '',
  price: 0,
  duration: 0,
  professionals: [],
})

const editingService = ref(null)

const toggleProfessional = (professional) => {
  const index = newService.value.professionals.findIndex(p => p.id === professional.id)
  if (index === -1) {
    newService.value.professionals.push(professional)
  } else {
    newService.value.professionals.splice(index, 1)
  }
}

const handleSubmit = () => {
  if (editingService.value) {
    const index = services.value.findIndex(s => s.id === editingService.value.id)
    services.value[index] = { ...editingService.value, ...newService.value }
    editingService.value = null
  } else {
    services.value.push({ ...newService.value, id: Date.now() })
  }
  resetForm()
}

const editService = (service) => {
  editingService.value = service
  newService.value = { ...service }
}

const deleteService = (id) => {
  services.value = services.value.filter(service => service.id !== id)
}

const resetForm = () => {
  newService.value = {
    name: '',
    price: 0,
    duration: 0,
    professionals: [],
  }
}
</script>