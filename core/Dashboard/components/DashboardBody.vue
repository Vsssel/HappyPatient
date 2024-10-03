<template>
    <div v-if="showModal" class="modal-backdrop" @keydown.esc="closeModal" tabindex="0">
      <div class="modal-content position-relative">
        <button type="button" class="btn-close position-absolute top-0 end-0 m-2" aria-label="Close" @click="closeModal"></button>
        <div v-if="doctors.length > 0" class="doctors-wrapper">
          <DoctorCard :doctor="doctor" v-for="doctor in doctors" :key="doctor.id" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import DoctorCard from './DoctorCard.vue';
  import { doctors } from '../values';
  
  const showModal = ref(true);
  
  const closeModal = () => {
    showModal.value = false
    doctors.value = []
  };
  
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8); /* Dark background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensure it is above other content */
  }
  
  .modal-content {
    background-color: #fff; /* Modal background */
    padding: 2rem;
    border-radius: 10px;
    max-width: 90%;
    width: 700px;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .doctors-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    max-height: 60vh;
    overflow-y: auto;
  }
  
  .no-data {
    font-size: 1.5rem;
    color: #333;
  }
  </style>
  