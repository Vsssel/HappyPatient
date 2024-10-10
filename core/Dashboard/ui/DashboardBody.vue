<template>
  <div class="h-100 p-2 pt-0" style="flex-grow: 1; display: flex; flex-direction: column;  max-height: calc(90vh - 100px);">
    <div 
      v-if="doctors.length > 0"
      class="card w-100 p-2 h-100"
      style="overflow-y: auto;"
    >
        <DoctorCard 
          :doctor="doctor" 
          v-for="doctor in doctors" 
          :key="doctor.id" 
        />
    </div>
    <div v-else class="w-100 h-100">
      <div 
        class="h-100 w-100 d-flex flex-column align-items-center justify-content-center card p-5"
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
  flex-direction: column; /* Ensure the DoctorCard component grows properly */
  overflow-y: auto; /* Enables scrolling */
}
</style>
