<template>
  <div class="h-100 p-2 pt-0">
    <div 
      class="card flex-grow-1 w-100 h-100 p-2"
      style="flex-grow: 1; display: flex; flex-direction: column; overflow-y: auto;"
    >
        <DoctorCard 
          :doctor="doctor" 
          v-for="doctor in doctors" 
          :key="doctor.id" 
        />
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
