<template>
  <div class="h-100 p-2 pt-0">
    <div 
      v-if="doctors.length > 0"
      class="card w-100 p-2"
      style="flex-grow: 1; display: flex; flex-direction: column; overflow-y: auto; max-height: calc(90vh - 100px);"
    >
        <DoctorCard 
          :doctor="doctor" 
          v-for="doctor in doctors" 
          :key="doctor.id" 
        />
    </div>
    <div v-else>
      <div 
        class="d-flex align-items-center flex-column justify-content-center card p-5"
      >
        <img src="../../../assets/no_data.avif">
        <h3>{{ 'NO DATA' }}</h3>
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
