<template>
  <div class="card p-3 w-100 d-flex flex-column gap-3 justify-content-center">
    <h5 class="text-center">Appointment Information</h5>
    <AppointmentCard 
      :doctor="{ 
        name: appointment?.doctor.name, 
        surname: appointment?.doctor.surname, 
        avatarURL: appointment?.doctor.avatarUrl, 
        category: appointment?.category.title
      }"
      :patient="{
        name: appointment?.patient.name, 
        surname: appointment?.patient.surname
      }"
    />
    <FormField :form-group="form">
      <template #button></template>
    </FormField>
  </div>
</template> 
<script lang="ts" setup>
import AppointmentCard from '~/shared/components/AppointmentCard/AppointmentCard.vue'
import FormField from '~/shared/components/form/FormField.vue'
import type { FormGroup } from '~/shared/components/form/types'
import { defineProps, watch, onMounted, ref } from 'vue'
import { appointment } from '../values'


const form = ref<Array<FormGroup>>([
  {
    class: 'd-flex flex-column w-100 gap-2',
    fields: [
      {
        name: 'type',
        type: 'text',
        value: appointment.value?.type.name,
        disabled: true,
        label: { 
            text: 'Appointment Type', 
            class: 'text'
        }
      },
      {
        name: 'date',
        type: 'text',
        value: appointment.value?.date,
        disabled: true,
        label: {
            text: 'Date',
            class: 'text'
        }
      }
    ]
  },
  {
    class: 'd-flex mt-2 flex-row w-100 gap-2',
    fields: [
      {
        name: 'startTime',
        type: 'text',
        class: 'w-50',
        value: appointment.value?.startTime,
        disabled: true,
        label: { 
          text: 'Start Time',
          class: 'text'
        }
      },
      {
        name: 'endTime',
        type: 'text',
        class: 'w-50',
        value: appointment.value?.endTime,
        disabled: true,
        label: { 
          text: 'End Time',
          class: 'text'
        }
      }
    ]
  }
])

watch(appointment , () => {
  form.value[0].fields[0].value = appointment.value?.type.name
  form.value[0].fields[1].value = appointment.value?.date
  form.value[1].fields[0].value = appointment.value?.startTime
  form.value[1].fields[1].value = appointment.value?.endTime
})

onMounted(() => {
  form.value[0].fields[0].value = appointment.value?.type.name
  form.value[0].fields[1].value = appointment.value?.date
  form.value[1].fields[0].value = appointment.value?.startTime
  form.value[1].fields[1].value = appointment.value?.endTime
})
</script>