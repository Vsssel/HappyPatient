<template>
  <div class="card appointment-card p-2 ps-3 border-2 gap-3 d-flex">
    <div class="d-flex flex-row align-items-center justify-content-between">
      <div class="d-flex gap-1 flex-column">
        <span class="text">
          <span class="fw-bold">
            {{ capitalizeFirstLetter(record.type) }}
          </span> 
          by {{ record.doctor.name }} {{ record.doctor.surname }}
        </span>
        <span class="text">
            {{ record.addedTime }}
        </span>
      </div>
      <div class="btn btn-sm" style="background-color: #FEE2E2; color: #7F1D1D;">
        <i class="bi bi-emoji-angry text" />
        Report
      </div>
    </div>
    <div class="d-flex">
      <span class="text">
        {{ record.content }}
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import type { GetPatientRecordsResponse } from '../types'
import { capitalizeFirstLetter } from '~/shared/utils'

const props = defineProps<{
  record: GetPatientRecordsResponse['page'][0]
}>()

console.log(props.record)
</script>