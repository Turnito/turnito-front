<template>
  <div class="flex h-screen bg-gray-100 w-full">


    <!-- Main content -->
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-3xl font-medium text-gray-700">Personalización de Marca e Información</h3>

        <div class="mt-8">
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <!-- Customization Form -->
            <div class="bg-white shadow-md rounded-lg p-6">
              <h4 class="text-xl font-semibold text-gray-700 mb-4">Configuración de Marca e Información</h4>
              
              <!-- Logo Upload -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2" for="logo">
                  Logotipo de la Empresa
                </label>
                <div class="flex items-center">
                  <input
                    type="file"
                    id="logo"
                    @change="handleLogoUpload"
                    accept="image/*"
                    class="hidden"
                  />
                  <label
                    for="logo"
                    class="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Subir Logo
                  </label>
                  <span v-if="branding.logo" class="ml-3 text-sm text-gray-600">
                    {{ branding.logo.name }}
                  </span>
                </div>
              </div>

              <!-- Color Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Colores de la Marca
                </label>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1" for="primaryColor">Color Primario</label>
                    <input
                      v-model="branding.primaryColor"
                      type="color"
                      id="primaryColor"
                      class="w-full h-10 rounded-md cursor-pointer"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1" for="secondaryColor">Color Secundario</label>
                    <input
                      v-model="branding.secondaryColor"
                      type="color"
                      id="secondaryColor"
                      class="w-full h-10 rounded-md cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <!-- Company Description -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2" for="description">
                  Descripción de la Empresa
                </label>
                <textarea
                  v-model="branding.description"
                  id="description"
                  rows="4"
                  class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                  placeholder="Escriba una breve descripción de su empresa..."
                ></textarea>
              </div>

              <!-- Business Hours -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Horario de Atención
                </label>
                <div v-for="(day, index) in branding.businessHours" :key="index" class="flex items-center mb-2">
                  <span class="w-20 text-sm">{{ day.name }}</span>
                  <input
                    v-model="day.open"
                    type="time"
                    class="mr-2 px-2 py-1 border rounded"
                  />
                  <span class="mx-2">-</span>
                  <input
                    v-model="day.close"
                    type="time"
                    class="mr-2 px-2 py-1 border rounded"
                  />
                  <label class="flex items-center">
                    <input
                      v-model="day.closed"
                      type="checkbox"
                      class="mr-2"
                    />
                    <span class="text-sm">Cerrado</span>
                  </label>
                </div>
              </div>

              <!-- Location Information -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Información de Ubicación
                </label>
                <input
                  v-model="branding.address"
                  type="text"
                  placeholder="Dirección"
                  class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                />
                <div class="grid grid-cols-2 gap-2">
                  <input
                    v-model="branding.city"
                    type="text"
                    placeholder="Ciudad"
                    class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    v-model="branding.postalCode"
                    type="text"
                    placeholder="Código Postal"
                    class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Contact Information -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Información de Contacto
                </label>
                <input
                  v-model="branding.phone"
                  type="tel"
                  placeholder="Teléfono"
                  class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                />
                <input
                  v-model="branding.email"
                  type="email"
                  placeholder="Correo Electrónico"
                  class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>

              <!-- Social Media Links -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Redes Sociales
                </label>
                <div v-for="(social, index) in branding.socialMedia" :key="index" class="flex items-center mb-2">
                  <span class="w-24 text-sm">{{ social.name }}</span>
                  <input
                    v-model="social.url"
                    type="url"
                    :placeholder="`URL de ${social.name}`"
                    class="flex-grow px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Save Button -->
              <button
                @click="saveBranding"
                class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Guardar Cambios
              </button>
            </div>

            <!-- Preview -->
            <div class="bg-white shadow-md rounded-lg p-6">
              <h4 class="text-xl font-semibold text-gray-700 mb-4">Vista Previa</h4>
              
              <div class="border rounded-lg p-6" :style="{ backgroundColor: branding.primaryColor }">
                <div class="bg-white rounded-lg p-4 shadow-md">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <img
                        v-if="logoPreview"
                        :src="logoPreview"
                        alt="Logo de la empresa"
                        class="h-12 w-12 object-contain mr-3"
                      />
                      <div v-else class="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <ImageIcon class="h-6 w-6 text-gray-400" />
                      </div>
                      <h2 class="text-2xl font-bold" :style="{ color: branding.secondaryColor }">
                        Su Empresa
                      </h2>
                    </div>
                    <button
                      class="px-4 py-2 rounded-md text-white"
                      :style="{ backgroundColor: branding.secondaryColor }"
                    >
                      Reservar
                    </button>
                  </div>
                  <p class="text-gray-600 mb-4">{{ branding.description || 'Descripción de la empresa' }}</p>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <h5 class="font-semibold mb-2">Horario de Atención</h5>
                      <ul class="text-sm">
                        <li v-for="day in branding.businessHours" :key="day.name" class="mb-1">
                          <span class="font-medium">{{ day.name }}:</span>
                          <span v-if="day.closed">Cerrado</span>
                          <span v-else>{{ day.open }} - {{ day.close }}</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 class="font-semibold mb-2">Ubicación</h5>
                      <p class="text-sm">
                        {{ branding.address }}<br>
                        {{ branding.city }}, {{ branding.postalCode }}
                      </p>
                      <h5 class="font-semibold mt-4 mb-2">Contacto</h5>
                      <p class="text-sm">
                        {{ branding.phone }}<br>
                        {{ branding.email }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-4">
                    <h5 class="font-semibold mb-2">Síguenos en</h5>
                    <div class="flex space-x-2">
                      <a v-for="social in branding.socialMedia" :key="social.name" :href="social.url" target="_blank" class="text-blue-500 hover:text-blue-700">
                        <component :is="social.icon" class="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6">
                <h5 class="text-lg font-semibold text-gray-700 mb-2">Colores Seleccionados</h5>
                <div class="flex space-x-4">
                  <div>
                    <div class="w-16 h-16 rounded-md mb-1" :style="{ backgroundColor: branding.primaryColor }"></div>
                    <p class="text-xs text-gray-500">Primario</p>
                  </div>
                  <div>
                    <div class="w-16 h-16 rounded-md mb-1" :style="{ backgroundColor: branding.secondaryColor }"></div>
                    <p class="text-xs text-gray-500">Secundario</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ImageIcon, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-vue-next'

const branding = ref({
  logo: null,
  primaryColor: '#4F46E5',
  secondaryColor: '#10B981',
  description: '',
  businessHours: [
    { name: 'Lunes', open: '09:00', close: '18:00', closed: false },
    { name: 'Martes', open: '09:00', close: '18:00', closed: false },
    { name: 'Miércoles', open: '09:00', close: '18:00', closed: false },
    { name: 'Jueves', open: '09:00', close: '18:00', closed: false },
    { name: 'Viernes', open: '09:00', close: '18:00', closed: false },
    { name: 'Sábado', open: '10:00', close: '14:00', closed: false },
    { name: 'Domingo', open: '00:00', close: '00:00', closed: true },
  ],
  address: '',
  city: '',
  postalCode: '',
  phone: '',
  
  email: '',
  socialMedia: [
    { name: 'Facebook', url: '', icon: FacebookIcon },
    { name: 'Instagram', url: '', icon: InstagramIcon },
    { name: 'Twitter', url: '', icon: TwitterIcon },
  ],
})

const logoPreview = ref(null)

const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    branding.value.logo = file
    const reader = new FileReader()
    reader.onload = (e) => {
      logoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveBranding = () => {
  // Here you would typically send the branding data to your backend
  console.log('Saving branding:', branding.value)
  // You can add an API call here to save the data
  alert('Cambios guardados exitosamente!')
}
</script>