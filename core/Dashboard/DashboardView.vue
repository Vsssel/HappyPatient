<template>
  <div class="d-flex justify-content-center w-100 h-100" style="height: 100%;">
    <div class="d-flex pt-2 gap-1 flex-row h-100 content-container"> 
      <DashboardFilter  class="col-3" />
      <Skeleton v-if="loader" width="70%" height="35rem"/>
      <DashboardBody v-else class="d-flex col-9" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardFilter from './ui/DashboardFilter.vue'
import DashboardBody from './ui/DashboardBody.vue'
import { values } from './values'
import { getDoctors } from './api'
import { doctors } from './values'
import { ref, watch } from 'vue'
import { debounce } from './utils'
import Skeleton from 'primevue/skeleton'
import type { DoctorSearchRequest } from './types'

const loader = ref<boolean>(true)

const debouncedFetchDoctors = debounce(async (filteredValue: DoctorSearchRequest) => {
  try {
    doctors.value = (await getDoctors(filteredValue)).data;
  } finally {
    loader.value = false;
  }
}, 500);



const removeEmptyParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined)
  )
}

watch(values, () => {
  const filteredValue = removeEmptyParams(values.value)
  debouncedFetchDoctors(filteredValue)
})
</script>
<style scoped>


</style>
