<template>
  <div class="card p-3 d-flex justify-content-center align-items-center gap-2">
    <div class="rounded-circle d-flex align-items-center justify-content-center bg-primary" style="width: 5vw; height: 5vw;">
      <span class="text-white fs-2">{{ patient?.name.slice(0,1) }}{{ patient?.surname.slice(0,1) }}</span>
    </div>
    <div class="d-flex flex-column align-items-center gap-1">
      <span class="fs-6 fw-medium">
      {{ patient?.name }} {{ patient?.surname }}
      </span>
      <span class="text text-secondary">
        Gender: {{ patient?.gender }}
      </span>
      <span class="text text-secondary">
        <i class="bi bi-cake2" />
        {{ patient?.birth_date }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import type { GetPatientInfoResponse } from '../types'
import { patient } from '../values'

</script>