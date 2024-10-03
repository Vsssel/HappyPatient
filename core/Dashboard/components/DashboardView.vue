<template>
    <div>
      <DashboardFilter class="border-1"/>
      <div class="w-100 p-5 d-flex justify-content-center">
        <AboutUsView></AboutUsView>
      </div>
      <DashboardBody v-if="doctors && doctors.length > 0"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import DashboardFilter from './DashboardFilter.vue'
  import DashboardBody from './DashboardBody.vue'
  import AboutUsView from './AboutUsView.vue'
  import { doctors } from '../values';
  </script>
  