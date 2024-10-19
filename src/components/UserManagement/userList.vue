<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6">
    <div class="p-4 flex justify-between items-center border-b">
      <h4 class="text-lg font-semibold text-gray-700">Usuarios Registrados</h4>
      <div class="flex space-x-2">
        <button
          @click="createUser"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Nuevo Usuario
        </button>
        <button
          @click="exportUserData"
          class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
        >
          <DownloadIcon class="h-5 w-5 mr-2" />
          Exportar
        </button>
      </div>
    </div>
    <div class="p-4 border-b">
      <div class="flex space-x-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar usuarios..."
          class="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          v-model="filterRole"
          class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todos los roles</option>
          <option value="admin">Administrador</option>
          <option value="staff">Personal</option>
          <option value="client">Cliente</option>
        </select>
      </div>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Usuario
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Rol
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Estado
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Última Actividad
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in filteredUsers" :key="user.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
                <img class="h-10 w-10 rounded-full" :src="user.avatar" :alt="user.name" />
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                <div class="text-sm text-gray-500">{{ user.email }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="{
                'bg-purple-100 text-purple-800': user.role === 'admin',
                'bg-blue-100 text-blue-800': user.role === 'staff',
                'bg-green-100 text-green-800': user.role === 'client'
              }"
            >
              {{ user.role }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="{
                'bg-green-100 text-green-800': user.status === 'active',
                'bg-red-100 text-red-800': user.status === 'blocked'
              }"
            >
              {{ user.status }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ user.lastActivity }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-2">
              <Edit2Icon class="h-5 w-5" />
            </button>
            <button
              @click="toggleUserStatus(user)"
              :class="
                user.status === 'active'
                  ? 'text-red-600 hover:text-red-900'
                  : 'text-green-600 hover:text-green-900'
              "
            >
              <component :is="user.status === 'active' ? LockIcon : UnlockIcon" class="h-5 w-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <CreateUserEditModal
      v-if="showCreateUserModal"
      :editing-user="editingUser"
      :new-user="newUser"
      @save-user="saveUser"
      @close="showCreateUserModal = false"
    />
  </div>
</template>

<script setup>
import { PlusIcon, DownloadIcon, Edit2Icon, LockIcon, UnlockIcon } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import CreateUserEditModal from './createUserEditModal.vue'

const userStore = useUserStore()

const searchQuery = ref('')
const filterRole = ref('')
const showCreateUserModal = ref(false)
const editingUser = ref(null)
const newUser = ref({
  name: '',
  email: '',
  role: 'client'
})

const filteredUsers = computed(() => {
  return userStore.usersManagement.filter((user) => {
    const name = user.name ? user.name.toLowerCase() : ''
    const email = user.email ? user.email.toLowerCase() : ''
    const matchesSearch =
      name.includes(searchQuery.value.toLowerCase()) ||
      email.includes(searchQuery.value.toLowerCase())
    const matchesRole = filterRole.value === '' || user.role === filterRole.value
    return matchesSearch && matchesRole
  })
})

const editUser = (user) => {
  editingUser.value = user
  newUser.value = { ...user }
  showCreateUserModal.value = true
}
const createUser = () => {
  showCreateUserModal.value = !showCreateUserModal.value
}
const toggleUserStatus = (user) => {
  const index = userStore.usersManagement.findIndex((u) => u.id === user.id)
  if (index !== -1) {
    userStore.usersManagement[index].status =
      userStore.usersManagement[index].status === 'active' ? 'blocked' : 'active'
    console.log('Updated User Status:', userStore.usersManagement[index])
  } else {
    console.log('User not found')
  }
}

const saveUser = (userData) => {
  if (editingUser.value) {
    const index = userStore.usersManagement.findIndex((u) => u.id === editingUser.value.id)
    userStore.usersManagement[index] = { ...userStore.usersManagement[index], ...userData }
    console.log('Update User', userStore.usersManagement)
  } else {
    userStore.usersManagement.push({
      id: Date.now(),
      ...userData,
      status: 'active',
      lastActivity: 'Ahora',
      avatar: '/placeholder.svg?height=40&width=40'
    })
    console.log('new user', userStore.usersManagement)
  }
  showCreateUserModal.value = false
  editingUser.value = null
  newUser.value = { name: '', email: '', role: 'client' }
}

const exportUserData = () => {
  console.log('Exporting user data...')
  alert('Los datos de los usuarios han sido exportados.')
}
</script>
