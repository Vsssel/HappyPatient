import type { FormGroup } from "~/shared/components/form/types"
import { values } from "./refs"

export const formGroup = ref<FormGroup[]>([
  {
    class: 'w-100 d-flex flex-column gap-2',
    fields: [
      {
        name: 'appointment_for',
        type: 'slot',
        class: 'col-12',
        label: {
          text: 'Appointment for',
          class: 'text'
        }
      },
    ]
  }
])
  
export const formForAppointment = ref<FormGroup[]>([
{
    class: 'w-100 mt-2',
    fields: [
      {
        name: 'typeId',
        type: 'slot',
        class: 'col-12',
        label: { 
          text: 'Appointment type',
          class: 'text'
        }
      }
    ]
  },
  {
    class: 'd-flex w-100',
    fields: [
      {
        name: 'date',
        type: 'date',
        label: { 
          text: "Date",
          class: 'text'
        },
        class: 'col-12 mt-2 text',
        value: values.value.date,
        disabled: true,
        minDate: new Date(),
        maxDate: new Date(new Date().getTime() + 3 * 7 * 24 * 60 * 60 * 1000),
        dateFormat: 'dd.mm.yy'
      }
    ]
  },
  {
    class: 'row mt-2',
    fields: [
      {
        name: 'startsAt',
        type: 'date',
        label: { 
          text: "Start Time",
          class: 'text'
        },
        class: 'col-6',
        value: new Date(values.value.startsAt),
        disabled: true,
        timeOnly: true,
        dateFormat: 'HH:mm'
      },
      {
        name: 'endsAt',
        type: 'date',
        label: { 
          text: "End Time",
          class: 'text'
        },
        class: 'col-6',
        value: new Date(values.value.endsAt),
        disabled: true,
        timeOnly: true,
        dateFormat: 'HH:mm'
      }
    ]
  }
  ])
  
export const formForPatient = ref<FormGroup[]>([
  {
    class: 'w-100',
    fields: [
      {
        name: 'isPatientHasAccount',
        type: 'slot',
        class: 'col-12 mt-2',
      },
      {
        name: 'email',
        type: 'slot',
        class: 'col-12'
      }
    ]
  }
])
  
export const formForSearch = ref<FormGroup[]>([
  {
    class: 'w-100',
    fields: [
      {
        name: 'patient',
        type: 'slot',
        class: 'col-12 mt-2',
      }
    ]
  }
])