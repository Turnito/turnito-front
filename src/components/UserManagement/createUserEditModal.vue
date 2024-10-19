<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">
        {{ editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario' }}
      </h2>
      <form @submit.prevent="saveUser">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            v-model="userData.name"
            type="text"
            id="name"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="userData.email"
            type="email"
            id="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div class="mb-4">
          <label for="role" class="block text-sm font-medium text-gray-700">Rol</label>
          <select
            v-model="userData.role"
            id="role"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="admin">Administrador</option>
            <option value="staff">Personal</option>
            <option value="client">Cliente</option>
          </select>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingUser: Object,
  newUser: Object
})

const emit = defineEmits(['save-user', 'close'])

const userData = ref({ ...props.newUser })

watch(
  () => props.editingUser,
  (newValue) => {
    if (newValue) {
      userData.value = { ...newValue }
    } else {
      userData.value = { ...props.newUser }
    }
  },
  { immediate: true }
)

const saveUser = () => {
  emit('save-user', userData.value)
}
</script>
