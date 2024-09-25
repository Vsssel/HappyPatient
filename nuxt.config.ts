import Aura from "@primevue/themes/aura";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module'
  ],

  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },

  primevue: {
    options: {
      theme: {
        preset: Aura
      }
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
