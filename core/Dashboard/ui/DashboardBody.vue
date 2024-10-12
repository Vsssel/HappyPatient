<template>
  <div class="d-flex p-3 bg-dark w-100 overflow-hidden">
    <div 
      v-if="doctors && doctors.length > 0"
      class="d-flex bg-primary w-100 flex-row justify-content-between flex-wrap"
      style="overflow-y: scroll;"
    >
        <DoctorCard 
          :doctor="doctor" 
          v-for="doctor in doctors" 
          :key="doctor.id" 
          class="m-2"
        />
    </div>
    <div v-else class="w-100">
      <div 
        class="w-100 d-flex flex-column align-items-center justify-content-center card p-5"
      >
        <img src="../../../assets/no_data.jpg">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'
import { doctors } from '../values'
</script>

<style scoped>
.flex-grow-1 {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
