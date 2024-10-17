import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore({
  id: 'employees',
  state: () => ({
    professional: []
  }),
  actions: {
    setEventSelected(event) {
      this.eventSelected = event
    }
  }
})
