<template>
  <div class="d-flex flex-column" style="width: 900px; margin: auto;"> 
    <DashboardFilter />
    <div v-if="loader" class="p-2"> 
      <Skeleton width="100%" height="40rem"/>
    </div>
    <DashboardBody v-else />
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
