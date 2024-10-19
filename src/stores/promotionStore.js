import { defineStore } from 'pinia'

export const usePromotionStore = defineStore({
  id: 'promotions',
  state: () => ({
    promotions: [],
    selectedPromotion: null,
    editing: false
  }),
  actions: {
    addPromotion(promotion) {
      promotion.id = this.promotions.length + 1
      this.promotions.push(promotion)
      this.resetForm()
    },
    updatePromotion(updatedPromotion) {
      const index = this.promotions.findIndex((promo) => promo.id === updatedPromotion.id)
      if (index !== -1) {
        this.promotions[index] = updatedPromotion
      }
      this.resetForm()
    },
    deletePromotion(id) {
      this.promotions = this.promotions.filter((promo) => promo.id !== id)
    },
    selectPromotion(promotion) {
      this.selectedPromotion = { ...promotion }
      this.editing = true
    },
    resetForm() {
      this.selectedPromotion = {
        id: null,
        name: '',
        type: 'discount',
        value: 0,
        service: 'all',
        startDate: '',
        endDate: '',
        description: ''
      }
      this.editing = false
    }
  }
})
