import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore({
  id: 'employees',
  state: () => ({
    professional: [],
    professionalSelected: null
  }),
  actions: {
    setNewProfessional(professional) {
      this.professional.push(professional)
    },
    updateProfessional(updatedProfessional) {
      const index = this.professional.findIndex((prof) => prof.id === updatedProfessional.id)
      if (index !== -1) {
        this.professional[index] = updatedProfessional
      }
      this.professionalSelected = null
    },

    deleteProfessional(id) {
      this.professional = this.professional.filter((p) => p.id !== id)
    }
  }
})
