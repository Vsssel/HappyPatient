<template>
  <div class="content-container m-2 gap-2 h-100 p-2 d-flex flex-column flex-md-row align-self-center">
    <div class="gap-1 col-12 col-md-3 flex-row">
      <PatientInfo :patient="patient"/>
    </div>
    <div class="gap-1 col-12 col-md-9 flex-row">
      <PatientRecordsList />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { getPatientInfo, getPatientRecords } from './api'
import { useRoute } from 'vue-router'
import PatientInfo from './ui/PatientInfo.vue'
import { patient, records } from './values'
import PatientRecordsList from './ui/PatientRecordsList.vue'

const router = useRoute()
const id = +router.params.id


onMounted(async() => {
  patient.value = (await getPatientInfo({id: id})).data
  records.value = (await getPatientRecords({ id: id, record_type: 'test', offset: 0, limit: 6 })).data
  console.log(records.value)
})
</script>