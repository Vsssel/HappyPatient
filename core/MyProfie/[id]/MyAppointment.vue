<template>
    <Skeleton v-if="loading" class="w-25 h-100" />
    <div v-else class="d-flex flex-row align-self-center">
        <FreeSlots v-if="!disabled"></FreeSlots>
        <div class="card p-3 m-3 d-flex flex-column justify-content-center w-100">
            <h5 class="text-center">Appointment Information</h5>
            <AppointmentCard 
                :name="appointment?.doctor.name" 
                :surname="appointment?.doctor.surname" 
                :avatar-u-r-l="appointment?.doctor.avatarUrl" 
                :category="appointment?.category.title" 
            />
            <FormView 
                :delete-appointment="deleteAppointment" 
                :onSubmit="onSubmit" 
                :onHandleChange="onHandleChange"
            />
        </div>
    </div>
    <ConfirmDialog />
    <Toast />
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { AppointmentCard } from '~/shared/components'
import { useRoute, useRouter } from 'vue-router'
import { getMySingleAppointment, deleteMySingleAppointmentResponse, putMySingleAppointment, getMyAppointmentResources } from './api'
import { addBreadcrumb } from '~/shared/stores'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { values, disabled, formGroup, resource,  appointment, totalPrice } from './values'
import { updateValues, onHandleChange } from './utils'
import FreeSlots from './ui/FreeSlots.vue'
import FormView from './ui/FormView.vue'

const route = useRoute()
const router = useRouter()
const appointmentId = Number(route.params.id)
const confirm = useConfirm()
const toast = useToast()
const loading = ref<boolean>(false)


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
            toast.add({severity: 'success', summary: "Success", detail: response.message, life: 4000})
            appointment.value = response.data
            disabled.value = true
            updateValues()

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
            toast.add({ severity: 'success', summary: 'Success', detail: response?.data.detail, life: 4000 })
            router.back()
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
