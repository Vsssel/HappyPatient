<template>
  <FormField 
    v-if="appointmentFor === 'Me' || isPatientHasAccount" 
    :formGroup="formForAppointment" 
    v-model:values="values" 
    :submit="onSubmit" 
    :onChange="onHandleChange">
    <template #typeId>
      <div class="d-flex gap-2">
        <div class="d-flex align-items-center gap-2">
          <RadioButton v-model="type" inputId="ingredient1" name="visit" value="1"/>
          <label class="text">Visit</label>
        </div>
        <div class="d-flex align-items-center gap-2">
          <RadioButton v-model="type" inputId="ingredient2" name="treatment" value="2"/>
          <label class="text">Treatment</label>
        </div>
      </div>
    </template>
    <template #button>
      <div class="w-100 d-flex mt-3 gap-2 justify-content-end">
        <button type="button" class="btn btn-sm btn-danger" @click="() => {isVisible.toggle()}">
          <span class="text text-white">Cancel</span>
        </button>
        <button type="submit" class="btn btn-sm btn-primary">
          <span class="text text-white">Submit</span>
        </button>
      </div>
    </template>
    <template #footer>
      <div class="d-flex m-2 w-100 gap-2 flex-column">
        <span class="text">
          <i class="bi bi-coin" style="color: #FFD700;"/>
          {{ totalPrice }} ₸
        </span>
      </div>
    </template>
  </FormField>
</template>
<script lang="ts" setup>
import { appointmentFor, isPatientHasAccount, formForAppointment, values, isVisible, totalPrice, type, selectedPatientID, patients, selectedPatient, doctor, weekNumber, searchError } from '../values'
import { onHandleChange, updateSchedule } from '../utils'
import RadioButton from 'primevue/radiobutton'
import FormField from '~/shared/components/form/FormField.vue'
import { postAppointment, postAppointmentForPatient } from '../api'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const onSubmit = async(fieldValues: Record<string, any>) => {
  const date = fieldValues.date.toLocaleDateString("en-GB").replace(/\//g, ".")
  const startsAt = fieldValues.startsAt.toLocaleTimeString("en-GB")
  const endsAt = fieldValues.endsAt.toLocaleTimeString("en-GB")
  selectedPatientID.value = appointmentFor.value === 'Patient' ?  patients.value.filter(res => `${res.name} ${res.surname}`.includes(selectedPatient.value.toString())) : 0
  if((selectedPatientID.value.length > 1 && appointmentFor.value === 'Patient')){
    console.log('error')
    searchError.value = 'Please select patient'
    return
  }
  if(selectedPatientID.value.length > 1 && appointmentFor.value === 'Patient'){
    searchError.value = 'Patient does not exists'
    return
  }
  const response = doctor.value && (appointmentFor.value === 'Me' ? 
  await postAppointment(doctor.value.id, weekNumber.value, {doctorId: doctor.value.id, date: date, typeId: Number(type.value), startsAt: startsAt, endsAt: endsAt}) 
  : await postAppointmentForPatient(Number(selectedPatientID.value[0].id), {doctorId: doctor.value.id, date: date, typeId: Number(type.value), startsAt: startsAt, endsAt: endsAt}))
  if(response && response.status < 400){
    toast.add({severity: 'success', summary: "Success", detail: response.data.detail, life: 4000})
    isVisible.value.toggle()
    appointmentFor.value = 'Me'
    selectedPatient.value = ''
    selectedPatientID.value = 0
    searchError.value = ''
  }else if (response?.status === 401 || response?.status === 422) {
    router.push('/auth/signin')
    console.log('router push')
  }
  else {
    toast.add({severity: 'error', summary: "Error", detail: response?.message, life: 4000})
  }
  await updateSchedule()
}
</script>