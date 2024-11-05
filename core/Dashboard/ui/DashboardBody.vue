<template>
  <div class="card pt-2 pb-2 d-flex flex-column" style="max-height: calc(100vh - 70px);">
    <div 
      v-if="doctors && doctors.length > 0"
      class="d-flex flex-grow-1 w-100  flex-column"
      style="overflow-y: auto;"
    >
      <div class="d-flex flex-wrap gap-2 justify-content-center">
        <DoctorCard 
          v-for="doctor in doctors" 
          :doctor="doctor" 
          :key="doctor.id" 
          class="mt-1 mb-1"
        />
      </div>
    </div>
    <div v-else class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-5">
      <img src="../../../assets/no_data.jpg" alt="No data available">
    </div>
  </div>
</template>

<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'
import { doctors } from '../values'
</script>
