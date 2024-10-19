<template>
  <div class="flex h-screen bg-gray-100 w-full">
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-3xl font-medium text-gray-700">Gestión de Usuarios</h3>

        <div class="mt-8">
          <UserList
            :users="filteredUsers"
            :search-query="searchQuery"
            :filter-role="filterRole"
            @edit-user="editUser"
            @toggle-user-status="toggleUserStatus"
            @export-user-data="exportUserData"
            @create-user="editUser"
          />
          <!-- <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-changed="changePage"
          />
          <UserActivity :activities="userActivities" /> -->
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// import Pagination from '@/components/UserManagement/pagination.vue'
// import UserActivity from '@/components/UserManagement/userActivity.vue'
import UserList from '@/components/UserManagement/userList.vue'

// const currentPage = ref(1)
// const itemsPerPage = 10

// const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))

// const changePage = (page) => {
//   currentPage.value = page
// }
</script>
