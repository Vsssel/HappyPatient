<template>
  <main class="d-flex flex-column" style="max-height: 100vh;">
    <Header v-if="!isAuthPage" />
    <NuxtPage class="d-flex flex-grow-1"/>
  </main>
</template>

<script setup lang="ts">
import Header from './shared/components/header/Header.vue'
import { useRoute } from 'vue-router'
import me from './shared/stores/User'

onMounted(() => {
  me.sync()
})

const route = useRoute()

const isAuthPage = computed(() => {
  return route.path === '/auth/signin' || route.path === '/auth/signup'
})
</script>
<style>
body {
  background-color: #F2F2F2;
}
</style>
