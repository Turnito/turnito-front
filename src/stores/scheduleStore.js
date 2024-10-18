import { defineStore } from 'pinia'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedules: [],
    scheduleSelected: []
  }),
  actions: {
    setScheduleSelected(schedule) {
      this.scheduleSelected = schedule
    },
    addSchedule(newSchedule) {
      this.schedules.push({
        id: Date.now(),
        ...newSchedule
      })
    },
    updateSchedule(updatedSchedule) {
      const index = this.schedules.findIndex((s) => s.id === updatedSchedule.id)
      if (index !== -1) {
        this.schedules[index] = { ...updatedSchedule }
        this.scheduleSelected = null
      }
    },
    deleteSchedule(id) {
      this.schedules = this.schedules.filter((s) => s.id !== id)
    }
  }
})
