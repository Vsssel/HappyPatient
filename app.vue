<template>
  <main class="d-flex w-100 flex-column align-items-center" style="max-height: 100vh;">
    <Header v-if="!isAuthPage" />
    <NuxtPage class="d-flex flex-grow-1" />
  </main>
</template>

<script setup lang="ts">
import Header from './shared/components/header/Header.vue'
import { useRoute } from 'vue-router'
import me from './shared/stores/User'
import { onBeforeMount } from 'vue'

const route = useRoute()

onBeforeMount(() => {
  me.sync()
})

const isAuthPage = computed(() => {
  return route.path === '/auth/signin' || route.path === '/auth/signup'
})
</script>
