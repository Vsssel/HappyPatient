<template>
  <div class="card p-3 d-flex flex-column" style="max-height: calc(90vh - 100px);">
    <div 
      v-if="doctors.length > 0"
      class="d-flex flex-grow-1 w-100  flex-column"
      style="overflow-y: auto;"
    >
      <div class="d-flex flex-wrap justify-content-around">
        <DoctorCard 
          :doctor="doctor" 
          v-for="doctor in doctors" 
          :key="doctor.id" 
          class="mb-2 mt-2"
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
