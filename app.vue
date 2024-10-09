<template>
  <Header v-if="!isAuthPage" />
  <NuxtPage />
</template>

<script setup lang="ts">
import Header from './shared/components/header/Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isAuthPage = computed(() => {
  return route.path === '/auth/signin' || route.path === '/auth/signup'
})
</script>
