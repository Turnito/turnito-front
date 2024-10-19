<template>
  <div class="bg-white shadow rounded-lg mb-6 p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Promociones Activas</h2>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Servicio</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Fecha de Fin
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="promotion in promotionStore.promotions" :key="promotion.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ promotion.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ promotion.type }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ promotion.value }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ promotion.service }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ promotion.endDate }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
            <button
              @click="editPromotion(promotion)"
              class="text-indigo-600 hover:text-indigo-900 mr-2"
            >
              Editar
            </button>
            <button @click="deletePromotion(promotion.id)" class="text-red-600 hover:text-red-900">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { usePromotionStore } from '@/stores/promotionStore'
const promotionStore = usePromotionStore()

const editPromotion = (promotion) => {
  promotionStore.selectPromotion(promotion)
}

const deletePromotion = (id) => {
  promotionStore.deletePromotion(id)
}
</script>
