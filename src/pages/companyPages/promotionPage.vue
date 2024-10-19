<template>
  <div class="w-full">
    <h1 class="text-3xl font-semibold text-gray-800">Gestión de Promociones</h1>
    <PromotionForm />
    <PromotionList />
  </div>
</template>

<script setup>
import PromotionForm from '@/components/promotion/promotionForm.vue'
import PromotionList from '@/components/promotion/promotionList.vue'
</script>
