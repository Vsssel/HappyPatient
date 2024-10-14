<template>
  <div class="d-flex flex-column align-items-end p-2">
    <div v-if="loader" class="w-100">
      <Skeleton width="100%" height="8rem"></Skeleton>
    </div>
    <div v-else class="card w-100 p-2" >
      <i 
        :class="[isVisible ? 'bi bi-chevron-up' : 'bi bi-chevron-down', 'd-flex align-self-end fs-4']" 
        @click="toggleFilter()" 
        style="cursor: pointer;"
      />
      <ShownFormField :data="data" />
      <ToggleFormField v-if="isVisible" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ShownFormField from './components/ShownFormField.vue'
import ToggleFormField from './components/ToggleFormField.vue'
import Skeleton from 'primevue/skeleton'
import { getDoctorsResourses } from '../api';

const isVisible = ref<boolean>(false)
const loader = ref<boolean>(true)
const data = ref()

const toggleFilter = () => {
  isVisible.value = !isVisible.value
  console.log(isVisible.value)
}

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
