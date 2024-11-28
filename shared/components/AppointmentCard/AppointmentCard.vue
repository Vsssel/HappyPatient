<template>
  <div class="w-100">
    <div class="w-100 d-flex gap-2">
      <div class="card w-50 p-1 d-flex gap-2 flex-row align-items-center">
        <img 
          v-if="props.doctor.avatarURL"
          :src="props.doctor.avatarURL" 
          :alt="'Doctor image'" 
          style="width: 40px; height: 40px; object-fit: cover;" 
          class="rounded-circle"
        />
        <DefaultAvatar v-else :width="'40'" :height="'40'" :name="props.doctor.name" :surname="props.doctor.surname"/>
        <div class="d-flex flex-column">
          <span class="fw-medium" style="font-size: 15px;">{{ props.doctor.name }} {{ props.doctor.surname }}</span>
          <span  style="font-size: 12px;" class="text-secondary">{{ props.doctor.category }}</span>
        </div>
      </div>
      <div class="card w-50 p-1 gap-2 d-flex flex-row align-items-center ps-2">
        <img 
          v-if="props.patient.avatarURL"
          :src="props.patient.avatarURL" 
          :alt="'Doctor image'" 
          style="width: 40px; height: 40px; object-fit: cover;" 
          class="rounded-circle"
        />
        <DefaultAvatar v-else :width="'40'" :height="'40'" :name="props.patient.name" :surname="props.patient.surname"/>
        <div class="d-flex flex-column">
          <span class="fw-medium" style="font-size: 15px;">{{ props.patient.name }} {{ props.patient.surname }}</span>
          <span style="font-size: 12px;" class="text-secondary">Patient</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import DefaultAvatar from '../header/DefaultAvatar.vue'

const props = defineProps<{
  doctor: {
    name: string | undefined
    surname: string | undefined
    category: string | undefined
    avatarURL?: string | undefined
  }
  patient: {
    name: string | undefined
    surname: string | undefined
    avatarURL?: string | undefined
  }
}>()
</script>
