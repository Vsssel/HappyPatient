<template>
    <div class="content-container d-flex align-self-center pt-2 gap-1 flex-row h-100"> 
      <DashboardFilter  class="col-3" />
      <Skeleton v-if="loader" width="70%" height="35rem"/>
      <DashboardBody v-else class="d-flex col-9" />
    </div>
</template>

<script setup lang="ts">
import DashboardFilter from './ui/DashboardFilter.vue'
import DashboardBody from './ui/DashboardBody.vue'
import { getDoctors } from './api'
import { doctors, values } from './values'
import { ref, watch, onMounted } from 'vue'
import Skeleton from 'primevue/skeleton'
import { addBreadcrumb, clearBreadcrumbs, removeBreadcrumbsAfter } from '~/shared/stores/useBreadCrumb'

const loader = ref<boolean>(true)

const removeEmptyParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined)
  )
}

onMounted(() => {
  clearBreadcrumbs()
  addBreadcrumb({name: "Doctors", path: '/'})
})


watch(values, async() => {
  const filteredValue = removeEmptyParams(values.value)
  try {
    doctors.value = (await getDoctors(filteredValue)).data
  } finally {
    loader.value = false;
  }
})
</script>
<style scoped>


</style>
