<template>
  <div class="d-flex w-100 flex-column gap-3">
    <div class="d-flex flex-row gap-2">
        <AppointmentCard :appointment="appointment"/>
    </div>
    <div v-if="appointment?.medicalRecords">
      <AppointmentRecords />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { appointment } from './values'
import { getAppointmentInfo } from './api'
import { useRoute } from 'vue-router'
import AppointmentCard from './ui/AppointmentCard.vue';
import AppointmentRecords from './ui/AppointmentRecords.vue';

const route = useRoute()
const id = +route.params.id

onMounted(async() => {
  appointment.value = (await getAppointmentInfo({ id: id})).data
})
</script>