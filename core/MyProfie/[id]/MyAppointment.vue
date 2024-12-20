<template>
  <Skeleton v-if="loading" style="width: 25%; height: 50%; padding: 10;" height="10rem" />
  <div 
    v-else 
    class="d-flex flex-column flex-md-row p-3 content-container m-3 gap-2 align-items-start justify-content-center">
    
    <div 
      :class="['d-flex flex-column flex-md-row gap-2', 
      appointment.receipt 
        ? 'col-12 col-md-8' 
        : `${!disabled ? 'col-8' : 'col-12 col-md-6'}`]"
    >
      <FreeSlots v-if="!disabled && !appointment.receipt"></FreeSlots>
      
      <div class="card p-3 w-100 d-flex flex-column gap-3">
        <h5 class="text-center">Appointment Information</h5>
        <AppointmentCard 
            :doctor="{
              name: appointment.doctor.name,
              surname: appointment.doctor.surname,
              avatarURL: appointment.doctor.avatarUrl,
              category: appointment.category.title
            }"
            :patient="{
              name: appointment.patient.name,
              surname: appointment.patient.surname
            }"
        />
        <FormView 
          :delete-appointment="deleteAppointment" 
          :onSubmit="onSubmit" 
          :onHandleChange="onHandleChange"
        />
        <div v-if="appointment.medicalRecords" class="w-100 p-2 border-top" />
        <Record v-if="appointment.medicalRecords" />
      </div>
    </div>

    <div 
      v-if="appointment.receipt" 
      class="d-flex card p-2 col-12 col-md-4 border-none gap-2 flex-column"
    >
      <div ref="element" class="d-flex w-100 justify-content-center">
        <Receipt />
      </div>
      <button 
        @click="downloadPDF" 
        class="w-100 btn btn-print border border-2 rounded d-flex justify-content-center gap-2"
      >
        <i class="bi bi-filetype-pdf" />
        Get PDF Receipt
      </button>
    </div> 

    <iframe :src="`https://www.google.com/maps/embed?pb=${appointment.room.location}`"
      width="500" 
      height="400" 
      style="border:1;" 
      allowfullscreen="true" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { AppointmentCard } from '~/shared/components'
import { useRoute, useRouter } from 'vue-router'
import { getMySingleAppointment, deleteMySingleAppointmentResponse, putMySingleAppointment, getMyAppointmentResources } from './api'
import { addBreadcrumb } from '~/shared/stores'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { values, disabled, formGroup, resource,  appointment, totalPrice, element } from './values'
import { updateValues, onHandleChange, downloadPDF } from './utils'
import FreeSlots from './ui/FreeSlots.vue'
import FormView from './ui/FormView.vue'
import Skeleton from 'primevue/skeleton'
import Receipt from './ui/Receipt.vue'
import Record from './ui/Record.vue'

const route = useRoute()
const router = useRouter()
const appointmentId = Number(route.params.id)
const confirm = useConfirm()
const toast = useToast()
const loading = ref<boolean>(false)
const url = ref<string>(``)

const onSubmit = async(fieldValues: Record<string, any>) => {
  const date = fieldValues.date.toLocaleDateString("en-GB").replace(/\//g, ".")
  const startsAt = fieldValues.startsAt.toLocaleTimeString("en-GB")
  const endsAt = fieldValues.endsAt.toLocaleTimeString("en-GB")
  confirm.require({
    message: 'Are you sure you want to save edits?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'No',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Yes',
      severity: 'info'
    },
    accept: async() => {
      const response = appointment.value && await putMySingleAppointment(appointment.value?.id, {
        doctorId: appointment.value?.doctor.id,
        date: date,
        typeId: values.value?.typeId,
        startsAt: startsAt,
        endsAt: endsAt
      })
      if(response && response.status < 400){
        appointment.value = response.data
        disabled.value = true
        updateValues()
        toast.add({severity: 'success', summary: "Success", detail: response.message, life: 4000})
      }else{
        toast.add({severity: 'error', summary: "Error", detail: response?.message, life: 4000})
      }
    }
  })
}

const deleteAppointment = async() => {
  confirm.require({
    message: 'Are you sure you want to delete this appointment?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'No',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Yes',
      severity: 'info'
    },
    accept: async() => {
      const response = appointment.value && await deleteMySingleAppointmentResponse(appointment.value.id)
      router.back()
      toast.add({ severity: 'success', summary: 'Success', detail: response?.data.detail, life: 4000 })
    }
  });
}

onMounted(async () => {
  try{
    loading.value = true
    appointment.value = (await getMySingleAppointment(appointmentId)).data
    resource.value = (await getMyAppointmentResources(appointment.value.doctor.id, `${appointment.value.date}` , { except_slot_id: appointment.value.id, duration: appointment.value.type.id === 1 ? 30 : 60 })).data
  }finally{
    loading.value = false
  }
  resource.value.priceList?.forEach(price => { price.typeId === values.value.typeId  ? totalPrice.value = price.price : 0 })
  console.log(resource.value.freeSlots, 'freeslots')
  if(!appointment.value){
    router.push(`/notfound`)
  }else {
    addBreadcrumb({ name: `My Appointment №${ appointment.value.index }`, path: `/myprofile/${ appointment.value.id }` })
    updateValues()
  }
})

watch(disabled, (newDisabled) => {
  formGroup.value.forEach(group => {
    group.fields.forEach(field => {
      field.disabled = newDisabled;
    });
  });
})

watch(appointment,() => {
  updateValues()
})
</script>
<style scoped>
.btn-print{
  background-color: rgb(255 255 255 / 30%);
  color: rgb(61 61 61 / 50%);
}

.btn-print:hover{
  background-color: rgb(255 255 255 / 100%);
  color: rgb(61 61 61 / 100%);
}
</style>