<template>
    <div class="d-flex align-self-center">
        <div class="card p-3 m-3 d-flex flex-column justify-content-center w-100">
            <h5 class="text-center">Appointment Information</h5>
            <AppointmentCard :doctor="appointment?.doctor"></AppointmentCard>
            <FormField :form-group="formGroup" v-model:values="values" :submit="onSubmit" :onChange="!disabled && onHandleChange">
                <template #button>
                    <div v-if="isFuture" class="w-100">
                        <div v-if="disabled" class="w-100 d-flex gap-2 mt-2 justify-content-end">
                            <button 
                                @click="deleteAppointment"
                                type="button"
                                class="btn btn-danger btn-sm col-2"
                            >
                                Delete
                            </button>
                            <button 
                                @click="editAppointment"
                                class="btn btn-primary btn-sm col-2"
                            >
                                Edit
                            </button>
                        </div>
                        <div v-else class="w-100 d-flex gap-2 mt-2 justify-content-end">
                            <button 
                                @click="async() => {disabled = true; updateForm();}"
                                class="btn btn-danger btn-sm col-2"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                class="btn btn-primary btn-sm col-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </template>
                <template #footer>
                    <div class="d-flex m-2 w-100 gap-2 flex-column">
                        <span>
                            <i class="bi bi-geo-alt fs-5 text-secondary"/>
                            {{ appointment?.room.address }}
                        </span>
                        <span>
                            <i class="bi bi-coin fs-5" style="color: #FFD700;"/>
                            {{ '10000₸' }}
                        </span>
                    </div>
                </template>
            </FormField>
        </div>
    </div>
    <ConfirmDialog />
    <Toast />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import AppointmentCard from '~/shared/components/AppointmentCard/AppointmentCard.vue'
import { useRoute } from 'vue-router'
import type { CardValuesType } from '~/shared/components/AppointmentCard/types'
import type { FormGroup } from '~/shared/components/form/types'
import { GetMySingleAppointment } from './api/getMySingleAppointment'
import { addBreadcrumb } from '~/shared/stores/useBreadCrumb'
import FormField from '~/shared/components/form/FormField.vue'
import type { GetMySingleAppointmentResponse } from './types'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { deleteMySingleAppointmentResponse } from './api/deleteMySingleAppointment'
import { useRouter } from 'vue-router'
import { putMySingleAppointment } from './api/putMySingleAppointmentt'

const route = useRoute()
const router = useRouter()
const appointmentId = Number(route.params.id)
const totalPrice = ref<number>()
const disabled = ref<boolean>(true)
const confirm = useConfirm()
const toast = useToast()
const isFuture = ref<boolean>(false)

const appointment = ref<GetMySingleAppointmentResponse>()
const values = ref<CardValuesType>({
    typeId: 0,
    date: new Date(),
    startsAt: new Date(),
    endsAt: new Date()
})

const formGroup = ref<FormGroup[]>([
    {
        class: 'd-flex w-100',
        fields: [
            {
                name: 'typeId',
                type: 'select',
                label: { text: "Appointment type" },
                required: true,
                class: 'col-12',
                options: [{ label: 'Visit', value: 1 }, { label: 'Treatment', value: 2 }],
                value: values.value.typeId,
                disabled: disabled.value
            }
        ]
    },
    {
        class: 'd-flex w-100',
        fields: [
            {
                name: 'date',
                type: 'date',
                label: { text: "Date" },
                required: true,
                class: 'col-12 mt-2',
                value: values.value.date,
                showIcon: true,
                minDate: new Date(),
                maxDate: new Date(new Date().getTime() + 3 * 7 * 24 * 60 * 60 * 1000),
                dateFormat: 'dd.mm.yy',
                disabled: disabled.value
            }
        ]
    },
    {
        class: 'row mt-2',
        fields: [
            {
                name: 'startsAt',
                type: 'date',
                label: { text: "Start Time" },
                required: true,
                class: 'col-6',
                stepMinute: 30,
                value: values.value.startsAt,
                showIcon: true,
                timeOnly: true,
                dateFormat: 'HH:mm',
                disabled: disabled.value
            },
            {
                name: 'endsAt',
                type: 'date',
                label: { text: "End Time" },
                required: true,
                class: 'col-6',
                stepMinute: 30,
                value: values.value.endsAt,
                showIcon: true,
                timeOnly: true,
                dateFormat: 'HH:mm',
                disabled: disabled.value
            }
        ]
    }
])

const onSubmit = async(fieldValues: Record<string, any>) => {
    console.log(fieldValues)
    const date = fieldValues.date.toLocaleDateString("en-GB").replace(/\//g, ".")
    const startsAt = fieldValues.startsAt.toLocaleTimeString("en-GB")
    const endsAt = fieldValues.endsAt.toLocaleTimeString("en-GB")
    const response = appointment.value && await putMySingleAppointment(appointment.value?.id, {
        doctorId: appointment.value?.doctor.id,
        date: date,
        typeId: appointment.value?.type.id,
        startsAt: startsAt,
        endsAt: endsAt
    })
    if(response && response.status < 400){
        toast.add({severity: 'success', summary: "Success", detail: response.message})
        appointment.value = response.data
        updateValues()
    }else{
        toast.add({severity: 'error', summary: "Error", detail: response?.message})
    }
}

const editAppointment = () => {
    disabled.value = false
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
            const response = appointment.value && (await deleteMySingleAppointmentResponse(appointment.value?.id))
            toast.add({ severity: 'success', summary: 'Success', detail: response?.data.detail, life: 4000 })
            router.back()
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 4000 });
        }
    });
}

const calculateEndTime = (startTime: Date, typeId: number): Date => {
    if (!startTime) return new Date()
    const duration = typeId === 1 ? 30 : 60
    return new Date(startTime.getTime() + duration * 60 * 1000)
}

const calculateStartTime = (endTime: Date, typeId: number): Date => {
    if (!endTime) return new Date()
    const duration = typeId === 1 ? 30 : 60
    return new Date(endTime.getTime() - duration * 60 * 1000)
}

let isUpdating = false

const updateEndTime = () => {
    if (!isUpdating && values.value.startsAt) {
        isUpdating = true
        values.value.endsAt = calculateEndTime(new Date(values.value.startsAt), values.value.typeId)
        updateForm()
        isUpdating = false
    }
};

const updateStartTime = () => {
    if (!isUpdating && values.value.endsAt) {
        isUpdating = true
        values.value.startsAt = calculateStartTime(new Date(values.value.endsAt), values.value.typeId)
        updateForm()
        isUpdating = false
    }
};

const onHandleChange = (fieldValues: Record<string, any>) => {
    if (fieldValues.typeId !== values.value.typeId) {
        values.value.typeId = fieldValues.typeId;
        updateEndTime();
    }

    if (fieldValues.date !== values.value.date) {
        values.value.date = fieldValues.date;
    }

    if (fieldValues.startsAt !== values.value.startsAt) {
        values.value.startsAt = fieldValues.startsAt;
        updateStartTime();
       
    } 

    else if (fieldValues.endsAt !== values.value.endsAt) {
        values.value.endsAt = fieldValues.endsAt;
        updateEndTime();
    }
}


const updateForm = () => {
    formGroup.value[0].fields[0].value = values.value.typeId
    formGroup.value[1].fields[0].value = new Date(values.value.date);
    formGroup.value[2].fields[0].value = values.value.startsAt;
    formGroup.value[2].fields[1].value = values.value.endsAt;


    nextTick(() => {
        formGroup.value[0].fields[0].value = values.value.typeId
        formGroup.value[1].fields[0].value = new Date(values.value.date);
        formGroup.value[2].fields[0].value = values.value.startsAt;
        formGroup.value[2].fields[1].value = values.value.endsAt;
    });
};

const updateValues = () => {
    const [day, month, year] = appointment.value?.date.split('.').map(Number);
    const [startHour, startMinute] = appointment.value?.startTime.split(':').map(Number);
    const [endHour, endMinute] = appointment.value?.endTime.split(':').map(Number);

    isFuture.value = new Date(year, month-1, day, startHour, startMinute) > new Date()
    values.value = {
        typeId: appointment.value?.type.id,
        date: new Date(year, month - 1, day),
        startsAt: new Date(year, month - 1, day, startHour, startMinute, 0),
        endsAt: new Date(year, month - 1, day, endHour, endMinute, 0)
    };
    updateForm()
}

onMounted(async () => {
    appointment.value = (await GetMySingleAppointment(appointmentId)).data
    addBreadcrumb({ name: `My Appointment №${appointment.value?.id}`, path: `/myprofile/${appointment.value?.id}` })
    updateValues()
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
