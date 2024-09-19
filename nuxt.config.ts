import Aura from '@primevue/themes/aura';

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
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  build: {
    transpile: ['bootstrap']
  },
  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' }
  ]
})
