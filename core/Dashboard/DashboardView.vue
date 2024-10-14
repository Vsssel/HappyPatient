<template>
  <div class="d-flex justify-content-center w-100 h-100" style="height: 100%;">
    <div class="d-flex flex-column h-100 content-container"> 
      <DashboardFilter />
      <div v-if="loader" class="p-2"> 
        <Skeleton width="100%" height="35rem"/>
      </div>
      <DashboardBody v-else class="d-flex" />
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
  try{
    doctors.value = (await getDoctors(filteredValue)).data
  }
  finally{
    loader.value = false
  }
}, 500)

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
.content-container {
  width: 100%;
}

@media (min-width: 1024px) and (max-width: 1199px) {
  .content-container { 
    max-width: 800px;
  }
}

@media (min-width: 1200px) and (max-width: 1499px) {
  .content-container { 
    max-width: 1000px;
  }
}

@media (min-width: 1500px) and (max-width: 1799px) {
  .content-container { 
    max-width: 1000px;
  }
}

@media (min-width: 1800px) {
  .content-container { 
    max-width: 1200px;
  }
}

</style>
