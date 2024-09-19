import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  modules: ["@primevue/nuxt-module"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
});
