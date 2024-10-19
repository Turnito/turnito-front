import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    usersManagement: [],
    userSelected: []
  }),
  actions: {
    addUser(newUser) {
      this.usersManagement.push({
        ...newUser
      })
    },
    updateUser(updatedUser) {
      const index = this.usersManagement.findIndex((s) => s.id === updatedUser.id)
      if (index !== -1) {
        this.usersManagement[index] = { ...updatedUser }
      }
    }
  }
})
