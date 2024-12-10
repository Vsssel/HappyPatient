<template>
  <div class="content-container m-2 gap-4 h-100 p-2 d-flex flex-column flex-md-row align-self-center">
    <div class="gap-1 col-12 col-md-3 flex-row">
      <PatientInfo :patient="patient"/>
    </div>
    <Tabs value="0" class="card col-12 col-md-9">
      <TabList>
        <Tab value="0">Appointment Information</Tab>
        <Tab value="1">Medical Records</Tab>
      </TabList>
      <TabPanels class="h-100">
        <TabPanel value="0" class="h-100">
          <AppointmentInfoView />
        </TabPanel>
        <TabPanel value="1" class="h-100">
          <MedicalRecordsView />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
  <AddRecordModal />
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { patient, records } from './feautures/MedicalRecords/values'
import { getPatientInfo, getPatientRecords } from './feautures/MedicalRecords/api';
import { useRoute } from 'vue-router'
import PatientInfo from './feautures/MedicalRecords/ui/PatientInfo.vue'
import AddRecordModal from './feautures/MedicalRecords/ui/AddRecordModal.vue'
import MedicalRecordsView from './feautures/MedicalRecords/MedicalRecordsView.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'
import AppointmentInfoView from './feautures/AppointmentInfo/AppointmentInfoView.vue';

const route = useRoute()
const id = +route.params.id

onMounted(async() => {
  patient.value = (await getPatientInfo({id: id})).data
  records.value = (await getPatientRecords({ id: id, record_type: 'test', offset: 0, limit: 6 })).data
  console.log(records.value)
})
</script>