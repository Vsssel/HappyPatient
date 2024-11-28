<template>
  <div class="h-100 d-flex flex-column flex-md-row align-self-center">
    <div v-if="records" class="gap-1 col-12 flex-row">
      <PatientRecordsList />
    </div>
    <div v-else class="gap-1 col-12 flex-row">
      <NotAvailable />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import PatientRecordsList from './ui/PatientRecordsList.vue'
import NotAvailable from './ui/NotAvailable.vue'
import { records } from './values'

const router = useRoute()
const id = +router.params.id
</script>