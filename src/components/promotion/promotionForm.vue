<template>
  <div class="bg-white shadow rounded-lg mb-6 p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">
      {{ isEditing ? 'Editar Promoción' : 'Crear Nueva Promoción' }}
    </h2>
    <form @submit.prevent="savePromotion">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <!-- Nombre de la promoción -->
        <div>
          <label for="promotionName" class="block text-sm font-medium text-gray-700"
            >Nombre de la Promoción</label
          >
          <input
            type="text"
            id="promotionName"
            v-model="localPromotion.name"
            required
            class="mt-1 block w-full rounded-md"
          />
        </div>

        <!-- Tipo de promoción -->
        <div>
          <label for="promotionType" class="block text-sm font-medium text-gray-700"
            >Tipo de Promoción</label
          >
          <select
            id="promotionType"
            v-model="localPromotion.type"
            required
            class="mt-1 block w-full rounded-md"
          >
            <option value="discount">Descuento Porcentual</option>
            <option value="fixed">Descuento de Monto Fijo</option>
            <option value="bundle">Paquete de Servicios</option>
          </select>
        </div>

        <!-- Valor de la promoción -->
        <div>
          <label for="promotionValue" class="block text-sm font-medium text-gray-700"
            >Valor de la Promoción</label
          >
          <input
            type="number"
            id="promotionValue"
            v-model="localPromotion.value"
            required
            class="mt-1 block w-full rounded-md"
          />
        </div>

        <!-- Servicio aplicable -->
        <div>
          <label for="promotionService" class="block text-sm font-medium text-gray-700"
            >Servicio Aplicable</label
          >
          <select
            id="promotionService"
            v-model="localPromotion.service"
            required
            class="mt-1 block w-full rounded-md"
          >
            <option value="all">Todos los Servicios</option>
            <option value="haircut">Corte de Pelo</option>
            <option value="coloring">Coloración</option>
            <option value="styling">Peinado</option>
          </select>
        </div>

        <!-- Fechas -->
        <div>
          <label for="startDate" class="block text-sm font-medium text-gray-700"
            >Fecha de Inicio</label
          >
          <input
            type="date"
            id="startDate"
            v-model="localPromotion.startDate"
            required
            class="mt-1 block w-full rounded-md"
          />
        </div>
        <div>
          <label for="endDate" class="block text-sm font-medium text-gray-700">Fecha de Fin</label>
          <input
            type="date"
            id="endDate"
            v-model="localPromotion.endDate"
            required
            class="mt-1 block w-full rounded-md"
          />
        </div>
      </div>

      <!-- Descripción -->
      <div class="mt-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="description"
          v-model="localPromotion.description"
          rows="3"
          class="mt-1 block w-full rounded-md"
        ></textarea>
      </div>

      <!-- Botones -->
      <div class="mt-4 flex justify-end space-x-3">
        <button
          type="button"
          @click="cancelEdit"
          class="inline-flex justify-center py-2 px-4 bg-gray-200 text-gray-700 rounded-md"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 bg-indigo-600 text-white rounded-md"
        >
          {{ isEditing ? 'Guardar Cambios' : 'Crear Promoción' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePromotionStore } from '@/stores/promotionStore'

const promotionStore = usePromotionStore()

const isEditing = ref(promotionStore.editing)
const localPromotion = ref({
  name: '',
  type: '',
  value: '',
  service: '',
  startDate: '',
  endDate: '',
  description: ''
})

if (isEditing.value) {
  Object.assign(localPromotion.value, promotionStore.selectedPromotion)
}
watch(
  () => promotionStore.selectedPromotion,
  (newPromotion) => {
    if (newPromotion) {
      isEditing.value = true
      localPromotion.value = { ...newPromotion }
    } else {
      isEditing.value = false
      localPromotion.value = {
        id: null,
        name: '',
        type: '',
        value: '',
        service: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    }
  },
  { immediate: true }
)

const savePromotion = () => {
  if (isEditing.value) {
    promotionStore.updatePromotion(localPromotion.value)
    console.log('update prmotion', localPromotion.value)
    localPromotion.value = {
      name: '',
      type: '',
      value: '',
      service: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  } else {
    promotionStore.addPromotion({ ...localPromotion.value })
    console.log('new promotion', localPromotion.value)

    localPromotion.value = {
      name: '',
      type: '',
      value: '',
      service: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  }
}

const cancelEdit = () => {
  promotionStore.resetForm()
}
</script>
