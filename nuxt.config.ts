import Aura from "@primevue/themes/aura";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module'
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL
    }
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    'primeicons/primeicons.css'
  ],


  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  build: {
    transpile: ["bootstrap"],
  },

  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' }
  ],

  compatibilityDate: '2024-09-22'
})
