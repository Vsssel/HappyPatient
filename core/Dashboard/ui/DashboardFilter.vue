<template>
  <div class="d-flex flex-column align-items-end">
    <div v-if="loader" class="w-100">
      <Skeleton width="100%" height="8rem"></Skeleton>
    </div>
    <div v-else class="card w-100 p-3" >
      <ShownFormField :data="data" />
      <span v-if="doctors">{{ `Found ${doctors.length} doctors` }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ShownFormField from './components/ShownFormField.vue'
import Skeleton from 'primevue/skeleton'
import { getDoctorsResourses } from '../api'
import { doctors } from '../values';

const loader = ref<boolean>(true)
const data = ref()

onMounted(async() => {
  try{
    data.value = (await getDoctorsResourses({ doctors: true, categories: true, offices: true })).data
  }
  finally{
    loader.value = false
  }
})
</script>

<style scoped>
.no-focus-outline:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
</style>
