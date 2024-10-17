<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">
    <div class="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full flex">
      <!-- Left side with illustration and gradient background -->
      <div class="hidden md:block w-1/2 bg-gradient-to-br from-purple-400 to-purple-600 p-8">
        <div class="h-full flex items-center justify-center">
          <img
            alt="Illustration"
            class="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      <!-- Right side with login form -->
      <div class="w-full md:w-1/2 p-8">
        <div class="text-right mb-4">
          <a href="#" class="text-sm text-gray-600 hover:underline">
            Not a member? Register now
          </a>
        </div>

        <h2 class="text-3xl font-bold text-gray-800 mb-2">Hello Again!</h2>
        <p class="text-gray-600 mb-8">Welcome back, you've been missed!</p>

        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="Enter username"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div class="relative">
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                <EyeOffIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div class="text-right mt-2">
            <a href="#" class="text-sm text-gray-600 hover:underline">
              Recovery Password
            </a>
          </div>

          <button
            type="submit"
            class="w-full bg-red-400 text-white rounded-md py-2 px-4 mt-6 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 flex justify-center space-x-4">
            <button class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 transition-colors duration-200">
            </button>
            <button class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 transition-colors duration-200">
            </button>
            <button class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 transition-colors duration-200">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'

const username = ref('')
const password = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = () => {
  // Handle login logic here
  console.log('Login attempted with:', { username: username.value, password: password.value })
}
</script>