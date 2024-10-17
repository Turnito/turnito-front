<template>
  <div class="flex h-screen bg-gray-100 w-full">

    <!-- Main content -->
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-3xl font-medium text-gray-700">Gestión de Usuarios</h3>

        <div class="mt-8">
          <!-- User List -->
          <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div class="p-4 flex justify-between items-center border-b">
              <h4 class="text-lg font-semibold text-gray-700">Usuarios Registrados</h4>
              <div class="flex space-x-2">
                <button @click="showCreateUserModal = true" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center">
                  <PlusIcon class="h-5 w-5 mr-2" />
                  Nuevo Usuario
                </button>
                <button @click="exportUserData" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Actividad</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in paginatedUsers" :key="user.id">
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
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                      'bg-purple-100 text-purple-800': user.role === 'admin',
                      'bg-blue-100 text-blue-800': user.role === 'staff',
                      'bg-green-100 text-green-800': user.role === 'client'
                    }">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                      'bg-green-100 text-green-800': user.status === 'active',
                      'bg-red-100 text-red-800': user.status === 'blocked'
                    }">
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
                    <button @click="toggleUserStatus(user)" :class="user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'">
                      <component :is="user.status === 'active' ? LockIcon : UnlockIcon" class="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Pagination -->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Anterior
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Siguiente
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Mostrando
                    <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                    a
                    <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }}</span>
                    de
                    <span class="font-medium">{{ filteredUsers.length }}</span>
                    resultados
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">Anterior</span>
                      <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button v-for="page in displayedPages" :key="page" @click="goToPage(page)" :class="[
                      page === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    ]">
                      {{ page }}
                    </button>
                    <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">Siguiente</span>
                      <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <!-- User Activity Log -->
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="p-4 border-b">
              <h4 class="text-lg font-semibold text-gray-700">Registro de Actividad de Usuarios</h4>
            </div>
            <ul class="divide-y divide-gray-200">
              <li v-for="activity in userActivities" :key="activity.id" class="p-4">
                <div class="flex items-center">
                  <img class="h-10 w-10 rounded-full mr-4" :src="activity.userAvatar" :alt="activity.userName" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ activity.userName }}</p>
                    <p class="text-sm text-gray-500">{{ activity.action }}</p>
                  </div>
                  <span class="ml-auto text-sm text-gray-500">{{ activity.timestamp }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit User Modal -->
    <div v-if="showCreateUserModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">{{ editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario' }}</h2>
        <form @submit.prevent="saveUser">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input v-model="newUser.name" type="text" id="name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="newUser.email" type="email" id="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="role" class="block text-sm font-medium text-gray-700">Rol</label>
            <select v-model="newUser.role" id="role" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option value="admin">Administrador</option>
              <option value="staff">Personal</option>
              <option value="client">Cliente</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showCreateUserModal = false" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PlusIcon, DownloadIcon, Edit2Icon, LockIcon, UnlockIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

const users = 
 ref([
  { id: 1, name: 'Ana García', email: 'ana@example.com', role: 'admin', status: 'active', lastActivity: '2023-05-15 14:30', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Carlos Rodríguez', email: 'carlos@example.com', role: 'staff', status: 'active', lastActivity: '2023-05-15 12:15', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'María López', email: 'maria@example.com', role: 'client', status: 'blocked', lastActivity: '2023-05-14 18:45', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 4, name: 'Juan Pérez', email: 'juan@example.com', role: 'client', status: 'active', lastActivity: '2023-05-15 09:20', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 5, name: 'Laura Martínez', email: 'laura@example.com', role: 'staff', status: 'active', lastActivity: '2023-05-15 11:00', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 6, name: 'Pedro Sánchez', email: 'pedro@example.com', role: 'client', status: 'active', lastActivity: '2023-05-14 16:30', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 7, name: 'Sofia Hernández', email: 'sofia@example.com', role: 'client', status: 'active', lastActivity: '2023-05-15 10:45', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 8, name: 'Diego Flores', email: 'diego@example.com', role: 'staff', status: 'active', lastActivity: '2023-05-15 13:20', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 9, name: 'Carmen Ruiz', email: 'carmen@example.com', role: 'client', status: 'blocked', lastActivity: '2023-05-14 15:10', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 10, name: 'Javier Torres', email: 'javier@example.com', role: 'client', status: 'active', lastActivity: '2023-05-15 08:55', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 11, name: 'Isabel Moreno', email: 'isabel@example.com', role: 'staff', status: 'active', lastActivity: '2023-05-15 12:40', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 12, name: 'Roberto Jiménez', email: 'roberto@example.com', role: 'client', status: 'active', lastActivity: '2023-05-14 17:25', avatar: '/placeholder.svg?height=40&width=40' },
])

const userActivities = ref([
  { id: 1, userName: 'Ana García', userAvatar: '/placeholder.svg?height=40&width=40', action: 'Creó un nuevo servicio', timestamp: '2023-05-15 14:30' },
  { id: 2, userName: 'Carlos Rodríguez', userAvatar: '/placeholder.svg?height=40&width=40', action: 'Actualizó el horario', timestamp: '2023-05-15 12:15' },
  { id: 3, userName: 'María López', userAvatar: '/placeholder.svg?height=40&width=40', action: 'Reservó una cita', timestamp: '2023-05-14 18:45' },
])

const searchQuery = ref('')
const filterRole = ref('')
const showCreateUserModal = ref(false)
const editingUser = ref(null)
const newUser = ref({
  name: '',
  email: '',
  role: 'client',
})

const currentPage = ref(1)
const itemsPerPage = 10

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = filterRole.value === '' || user.role === filterRole.value
    return matchesSearch && matchesRole
  })
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredUsers.value.slice(start, end)
})

const displayedPages = computed(() => {
  const range = 2
  const pages = []
  for (let i = Math.max(1, currentPage.value - range); i <= Math.min(totalPages.value, currentPage.value + range); i++) {
    pages.push(i)
  }
  return pages
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

const editUser = (user) => {
  editingUser.value = user
  newUser.value = { ...user }
  showCreateUserModal.value = true
}

const toggleUserStatus = (user) => {
  user.status = user.status === 'active' ? 'blocked' : 'active'
}

const saveUser = () => {
  if (editingUser.value) {
    const index = users.value.findIndex(u => u.id === editingUser.value.id)
    users.value[index] = { ...users.value[index], ...newUser.value }
  } else {
    users.value.push({
      id: users.value.length + 1,
      ...newUser.value,
      status: 'active',
      lastActivity: 'Ahora',
      avatar: '/placeholder.svg?height=40&width=40'
    })
  }
  showCreateUserModal.value = false
  editingUser.value = null
  newUser.value = { name: '', email: '', role: 'client' }
}

const exportUserData = () => {
  // Implement user data export functionality
  console.log('Exporting user data...')
  // In a real application, you would generate a CSV or Excel file with user data
  alert('Los datos de los usuarios han sido exportados.')
}
</script>