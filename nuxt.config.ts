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
    'bootstrap/dist/css/bootstrap.min.css',
    'primeicons/primeicons.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    'quill/dist/quill.snow.css'
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
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' },
    { src: '~/plugins/quill.client.ts', mode: 'client' }
  ]
})
