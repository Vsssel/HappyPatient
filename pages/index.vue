<template></template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

const router = useRouter()

onBeforeMount(() => {
   router.push('/doctors') 
})
</script>
