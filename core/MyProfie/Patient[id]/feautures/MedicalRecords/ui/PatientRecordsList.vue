<template>
  <div class="h-100 w-100 p-2 d-flex flex-column justify-content-between">
    <div class="w-100 d-flex flex-row gap-2 flex-wrap justify-content-center">
      <div class="d-flex flex-row gap-3 w-100 justify-content-center p-3">
        <div class="d-flex flex-row gap-2">
          <RadioButton v-model="recordType" value="test"></RadioButton>
          <span class="text">Tests</span>
        </div>
        <div class="d-flex flex-row gap-2">
          <RadioButton v-model="recordType" value="anamnesis"></RadioButton>
          <span class="text">Anamnesis</span>
        </div>
        <div class="d-flex flex-row gap-2">
          <RadioButton v-model="recordType" value="conclusion"></RadioButton>
          <span class="text">Conclusion</span>
        </div>
      </div>
      <PatientSingleRecord 
        v-for="record in records?.page" 
        :record="record" 
      />
    </div>
    <Paginator 
      :rows="6" 
      class="w-100"
      :totalRecords="records?.total"
      template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
      @page="updatePage"
    />
  </div>
</template>
<script setup lang="ts">
import PatientSingleRecord from './PatientSingleRecord.vue'
import { records, offset, recordType } from '../values'
import { getPatientRecords } from '../api'
import { ref, watch } from 'vue'
import Paginator, { type PageState } from 'primevue/paginator'
import { useRoute } from 'vue-router'
import RadioButton from 'primevue/radiobutton'

const route = useRoute()

const id = +route.params.id

const updatePage = async (event: PageState) => {
  offset.value = event.first
  records.value = (await getPatientRecords({ id: id, record_type: recordType.value, offset: offset.value, limit: 6 })).data
  console.log(records.value)
}

watch(recordType, async() => {
  records.value = (await getPatientRecords({ id: id, record_type: recordType.value, offset: offset.value, limit: 6 })).data
})
</script>