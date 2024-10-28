import Aura from "@primevue/themes/aura";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({

  modules: [
    '@primevue/nuxt-module'
  ],

  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
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
    'primeicons/primeicons.css',
    '~/assets/css/container.css',
    '~/assets/scss/global.scss'
  ],

  build: {
    transpile: ["bootstrap"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/variables.scss";'
        },
      },
    },
  },

  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' }
  ],

  compatibilityDate: '2024-09-22'
})
