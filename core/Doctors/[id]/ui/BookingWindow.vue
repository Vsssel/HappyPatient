<template>
    <Popover ref="isVisible" class="col-6 col-md-2">
        <FormField :formGroup="formGroup" v-model:values="values" :submit="onSubmit" :onChange="onHandleChange">
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
    </Popover>
    <Toast />
</template>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { selectedSlot, isVisible, doctor, weekNumber } from '../values'
import type { FormGroup } from '~/shared/components/form/types'
import { postAppointment } from '../api'
import { updateSchedule } from '../utils'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import FormField from '~/shared/components/form/FormField.vue'
import Popover from 'primevue/popover'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
const values = ref({
    typeId: 1,
    date: new Date(selectedSlot.value),
    startsAt: selectedSlot.value,
    endsAt: selectedSlot.value
})

const type = ref('1')

const totalPrice = ref(doctor.value?.price_list.filter(price => price.typeId === values.value.typeId)[0].price)
const formGroup = ref<FormGroup[]>([
    {
        class: 'w-100',
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
]);

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

const onSubmit = async(fieldValues: Record<string, any>) => {
    const date = fieldValues.date.toLocaleDateString("en-GB").replace(/\//g, ".")
    const startsAt = fieldValues.startsAt.toLocaleTimeString("en-GB")
    const endsAt = fieldValues.endsAt.toLocaleTimeString("en-GB")
    const response = doctor.value && await postAppointment(doctor.value.id, weekNumber.value, {doctorId: doctor.value.id, date: date, typeId: type.value, startsAt: startsAt, endsAt: endsAt})
    if(response && response.status < 400){
        toast.add({severity: 'success', summary: "Success", detail: response.data.detail, life: 4000})
        isVisible.value.toggle()
    }else if (response?.status === 401 || response?.status === 422) {
        router.push('/auth/signin')
        console.log('router push')
    }
    else {
        toast.add({severity: 'error', summary: "Error", detail: response?.message, life: 4000})
    }
    await updateSchedule()
}

let isUpdating = false

const updateStartTime = () => {
    if (!isUpdating && values.value.startsAt) {
        isUpdating = true
        values.value.endsAt = calculateEndTime(values.value.startsAt, values.value.typeId)
        isUpdating = false
    }
};

const updateEndTime = () => {
    if (!isUpdating && values.value.endsAt) {
        isUpdating = true
        values.value.startsAt = calculateStartTime(values.value.endsAt, values.value.typeId)
        isUpdating = false
    }
};

const onHandleChange = (fieldValues: Record<string, any>) => {
    if (fieldValues.date !== values.value.date) {
        values.value.date = fieldValues.date
    }

    if (fieldValues.startsAt !== values.value.startsAt) {
        values.value.startsAt = fieldValues.startsAt
        updateStartTime()
    } else if (fieldValues.endsAt !== values.value.endsAt) {
        values.value.endsAt = fieldValues.endsAt
        updateEndTime()
    }

    updateForm()
}

const updateForm = () => {
    formGroup.value[1].fields[0].value = values.value.date;
    formGroup.value[2].fields[0].value = values.value.startsAt;
    formGroup.value[2].fields[1].value = values.value.endsAt;


    nextTick(() => {
        formGroup.value[1].fields[0].value = values.value.date;
        formGroup.value[2].fields[0].value = values.value.startsAt;
        formGroup.value[2].fields[1].value = values.value.endsAt;
    });
};

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
</script>
