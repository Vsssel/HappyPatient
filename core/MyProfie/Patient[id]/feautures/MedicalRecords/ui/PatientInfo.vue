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
    <div class="w-100">
      <button 
        v-if="records?.page.length" 
        type="button"
        class="w-100 btn btn-sm btn-add-record"
        title="You can add records only rwhen records are availabe to you"
        @click="openAddRecordModal"
      >
        Add Record
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { patient, records } from '../values'
import { addRecord } from '../values'

const openAddRecordModal = () => {
  addRecord.value = true
}
</script>
<style scoped>
.btn-add-record{
  background-color: rgb(13 110 253 / 10%) !important;
  color: rgb(13 110 253  / 80%) !important;
}

.btn-add-record:hover{
  background-color: rgb(13 110 253) !important;
  color: white !important;
}
</style>