<template>
  <FormField v-if="appointmentFor === 'Patient' && isPatientHasAccount" :formGroup="formForSearch">
    <template #button></template>
    <template #patient>
      <span class="text">Patient Full Name</span>
      <AutoComplete input-class="w-100" class="w-100 mt-2" v-model="selectedPatient" :suggestions="suggestions" @complete="search"></AutoComplete>
      <span class="text text-danger mt-2 mb-2" v-if="searchError">{{ searchError }}</span>
    </template>
  </FormField>
</template>
<script lang="ts" setup>
import { getPatientsResourse } from '../api';
import { appointmentFor, isPatientHasAccount, formForSearch, selectedPatient, suggestions, patients, searchError } from '../values'
import AutoComplete from 'primevue/autocomplete'
import FormField from '~/shared/components/form/FormField.vue'

const search = async(event: { query: any }) => {
  const response = (await getPatientsResourse({fullname: event.query}))
  suggestions.value = response.data.map(res => `${res.name} ${res.surname}`)
  patients.value = response.data
}
</script>