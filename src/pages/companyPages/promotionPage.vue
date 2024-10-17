<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Gestión de Promociones y Ofertas</h1>
      
      <!-- Create/Edit Promotion Form -->
      <div class="bg-white shadow rounded-lg mb-6 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          {{ editingPromotion ? 'Editar Promoción' : 'Crear Nueva Promoción' }}
        </h2>
        <form @submit.prevent="savePromotion">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="promotionName" class="block text-sm font-medium text-gray-700">Nombre de la Promoción</label>
              <input type="text" id="promotionName" v-model="currentPromotion.name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div>
              <label for="promotionType" class="block text-sm font-medium text-gray-700">Tipo de Promoción</label>
              <select id="promotionType" v-model="currentPromotion.type" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="discount">Descuento Porcentual</option>
                <option value="fixed">Descuento de Monto Fijo</option>
                <option value="bundle">Paquete de Servicios</option>
              </select>
            </div>
            <div>
              <label for="promotionValue" class="block text-sm font-medium text-gray-700">Valor de la Promoción</label>
              <input type="number" id="promotionValue" v-model="currentPromotion.value" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div>
              <label for="promotionService" class="block text-sm font-medium text-gray-700">Servicio Aplicable</label>
              <select id="promotionService" v-model="currentPromotion.service" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="all">Todos los Servicios</option>
                <option value="haircut">Corte de Pelo</option>
                <option value="coloring">Coloración</option>
                <option value="styling">Peinado</option>
              </select>
            </div>
            <div>
              <label for="startDate" class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
              <input type="date" id="startDate" v-model="currentPromotion.startDate" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
            <div>
              <label for="endDate" class="block text-sm font-medium text-gray-700">Fecha de Fin</label>
              <input type="date" id="endDate" v-model="currentPromotion.endDate" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </div>
          </div>
          <div class="mt-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea id="description" v-model="currentPromotion.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div class="mt-4 flex justify-end space-x-3">
            <button type="button" @click="cancelEdit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Cancelar
            </button>
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ editingPromotion ? 'Guardar Cambios' : 'Crear Promoción' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Active Promotions -->
      <div class="bg-white shadow rounded-lg mb-6 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Promociones Activas</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Fin</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="promotion in activePromotions" :key="promotion.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ promotion.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ promotion.type }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ promotion.value }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ promotion.service }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ promotion.endDate }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="editPromotion(promotion)" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                  <button @click="deletePromotion(promotion.id)" class="text-red-600 hover:text-red-900">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Email Promotions -->
      <div class="bg-white shadow rounded-lg mb-6 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Enviar Promociones por Email</h2>
        <form @submit.prevent="sendPromotionEmail">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="clientGroup" class="block text-sm font-medium text-gray-700">Grupo de Clientes</label>
              <select id="clientGroup" v-model="emailData.targetGroup" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="all">Todos los Clientes</option>
                <option value="inactive">Clientes Inactivos (Sin visitas en 3 meses)</option>
                <option value="frequent">Clientes Frecuentes (Más de 3 visitas en 3 meses)</option>
                <option value="new">Nuevos Clientes (Registrados en el último mes)</option>
              </select>
            </div>
            <div>
              <label for="promotionToSend" class="block text-sm font-medium text-gray-700">Promoción a Enviar</label>
              <select id="promotionToSend" v-model="emailData.selectedPromotion" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option v-for="promotion in activePromotions" :key="promotion.id" :value="promotion.id">{{ promotion.name }}</option>
              </select>
            </div>
          </div>
          <div class="mt-4">
            <label for="emailSubject" class="block text-sm font-medium text-gray-700">Asunto del Email</label>
            <input type="text" id="emailSubject" v-model="emailData.subject" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          </div>
          <div class="mt-4">
            <label for="emailBody" class="block text-sm font-medium text-gray-700">Cuerpo del Email</label>
            <textarea id="emailBody" v-model="emailData.body" rows="4" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <button type="button" @click="previewEmail" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <EyeIcon class="mr-2 h-5 w-5 text-gray-400" />
              Previsualizar Email
            </button>
            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <MailIcon class="mr-2 h-5 w-5" />
              Enviar Email
            </button>
          </div>
        </form>
      </div>

      <!-- Email Preview Modal -->
      <div v-if="showEmailPreview" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
          <h2 class="text-2xl font-bold mb-4">Previsualización del Email</h2>
          <div class="border rounded-lg p-4 mb-4">
            <p><strong>Para:</strong> {{ emailPreviewData.to }}</p>
            <p><strong>Asunto:</strong> {{ emailPreviewData.subject }}</p>
            <div class="mt-4">
              <strong>Cuerpo:</strong>
              <div v-html="emailPreviewData.body" class="mt-2 prose"></div>
            </div>
          </div>
          <div class="flex justify-end">
            <button @click="showEmailPreview = false" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { EyeIcon, MailIcon } from 'lucide-vue-next'

const activePromotions = ref([
  { id: 1, name: 'Descuento de Verano', type: 'discount', value: 20, service: 'all', endDate: '2023-08-31' },
  { id: 2, name: 'Paquete de Belleza', type: 'bundle', value: 50, service: 'haircut', endDate: '2023-07-15' },
])

const currentPromotion = reactive({
  id: null,
  name: '',
  type: 'discount',
  value: 0,
  service: 'all',
  startDate: '',
  endDate: '',
  description: ''
})

const editingPromotion = ref(false)

const emailData = reactive({
  targetGroup: 'all',
  selectedPromotion: '',
  subject: '',
  body: ''
})

const showEmailPreview = ref(false)
const emailPreviewData = reactive({
  to: '',
  subject: '',
  body: ''
})

const  savePromotion = () => {
  if (editingPromotion.value) {
    const index = activePromotions.value.findIndex(p => p.id === currentPromotion.id)
    if (index !== -1) {
      activePromotions.value[index] = { ...currentPromotion }
    }
  } else {
    activePromotions.value.push({
      id: activePromotions.value.length + 1,
      ...currentPromotion
    })
  }
  resetPromotionForm()
}

const editPromotion = (promotion) => {
  Object.assign(currentPromotion, promotion)
  editingPromotion.value = true
}

const cancelEdit = () => {
  resetPromotionForm()
}

const resetPromotionForm = () => {
  Object.assign(currentPromotion, {
    id: null,
    name: '',
    type: 'discount',
    value: 0,
    service: 'all',
    startDate: '',
    endDate: '',
    description: ''
  })
  editingPromotion.value = false
}

const deletePromotion = (id) => {
  activePromotions.value = activePromotions.value.filter(promo => promo.id !== id)
}

const previewEmail = () => {
  const selectedPromotion = activePromotions.value.find(p => p.id === emailData.selectedPromotion)
  emailPreviewData.to = `Grupo: ${emailData.targetGroup}`
  emailPreviewData.subject = emailData.subject
  emailPreviewData.body = `
    <h1>${emailData.subject}</h1>
    <p>${emailData.body}</p>
    <h2>Detalles de la Promoción:</h2>
    <p><strong>Nombre:</strong> ${selectedPromotion.name}</p>
    <p><strong>Descuento:</strong> ${selectedPromotion.value}${selectedPromotion.type === 'discount' ? '%' : '€'}</p>
    <p><strong>Válido hasta:</strong> ${selectedPromotion.endDate}</p>
  `
  showEmailPreview.value = true
}

const sendPromotionEmail = () => {
  // Here you would typically integrate with your email service
  console.log('Sending email:', emailData)
  alert('Email enviado exitosamente!')
  // Reset form after sending
  emailData.subject = ''
  emailData.body = ''
}
</script>