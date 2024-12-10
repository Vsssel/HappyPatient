<template>
  <Popover ref="isVisible" class="col-6 col-md-2">
    <FormField :formGroup="formGroup">
      <template #button></template>
      <template #appointment_for>
        <SelectButton :allowEmpty="false" size="large" v-model="appointmentFor" :options="['Me', 'Patient']" />
      </template>
    </FormField>
    <FormForPatient />
    <FormForSearch />
    <FormForAppointment />
  </Popover>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { selectedSlot, isVisible, doctor, formGroup, values, email, appointmentFor, totalPrice, type, emailError } from '../values'
import { calculateEndTime, updateForm, updateStartTime, emailValidation } from '../utils'
import FormField from '~/shared/components/form/FormField.vue'
import Popover from 'primevue/popover'
import SelectButton from 'primevue/selectbutton'
import FormForPatient from './FormForPatient.vue'
import FormForSearch from './FormForSearch.vue'
import FormForAppointment from './FormForAppointment.vue'

watch(() => selectedSlot.value, (newDate) => {
  if (newDate) {
    values.value.date = new Date(newDate);
    values.value.startsAt = new Date(newDate);
    values.value.endsAt = calculateEndTime(values.value.startsAt, values.value.typeId);
    updateForm();
  }
}, { immediate: true });

watch(() => doctor.value, () => {
  totalPrice.value = doctor.value ? doctor.value.price_list.filter(price => price.typeId === values.value.typeId)[0].price : 0
})

watch(() => type.value, () => {
  values.value.typeId = Number(type.value)
  totalPrice.value = doctor.value ? doctor.value.price_list.filter(price => price.typeId === values.value.typeId)[0].price : 0
  updateStartTime()
  updateForm()
})

watch(() => email.value , () => {
  if (!email.value){
    emailError.value = 'Email is required'
  }
  else if (!emailValidation(email.value)) {
    emailError.value = 'Email is invalid'
  }else [
    emailError.value = ''
  ]
})
</script>
