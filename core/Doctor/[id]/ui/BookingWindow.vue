<template>
    <Dialog modal v-model:visible="isVisible" :draggable="false" style="width: 500px;">
        <template #header>
            <div class="w-100 d-flex justify-content-center">
                <h5>Make Appointment</h5>
            </div>
        </template>
        <table class="table table-striped">
            <tbody>
                <tr>
                    <td>Patient</td>
                    <td>{{ me.data.value.name }} {{ me.data.value.surname }}</td>
                </tr>
                <tr>
                    <td>Doctor</td>
                    <td>{{ doctor.name }} {{ doctor.surname }}</td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>{{ doctor.category.title }}</td>
                </tr>
            </tbody>
        </table>
        <FormField :formGroup="formGroup" v-model:values="values" :submit="onSubmit" :onChange="onHandleChange">
            <template #button>
                <div class="w-100 d-flex mt-3 justify-content-between">
                    <button type="button" class="btn btn-sm btn-danger" @click="isVisible = false">Cancel</button>
                    <button type="submit" class="btn btn-sm btn-primary">Submit</button>
                </div>
            </template>
        </FormField>
    </Dialog>
    <Toast />
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { selectedSlot, isVisible, doctor, weekNumber } from '../values';
import me from '~/shared/stores/User';
import Dialog from 'primevue/dialog';
import FormField from '~/shared/components/form/FormField.vue';
import type { FormGroup } from '~/shared/components/form/types';
import { postAppointment } from '../api'
import { updateSchedule } from '../functions';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast()

const values = ref({
    type_id: 1,
    date: new Date(selectedSlot.value),
    starts_at: new Date(selectedSlot.value),
    ends_at: new Date(selectedSlot.value)
});

const formGroup = ref<FormGroup[]>([
    {
        class: 'd-flex w-100',
        fields: [
            {
                name: 'type_id',
                type: 'select',
                label: { text: "Appointment type" },
                required: true,
                class: 'col-12',
                options: [{ label: 'Visit', value: 1 }, { label: 'Treatment', value: 2 }],
                value: values.value.type_id
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
                name: 'starts_at',
                type: 'date',
                label: { text: "Start Time" },
                required: true,
                class: 'col-6',
                value: values.value.starts_at,
                showIcon: true,
                timeOnly: true,
                dateFormat: 'HH:mm'
            },
            {
                name: 'ends_at',
                type: 'date',
                label: { text: "End Time" },
                required: true,
                class: 'col-6',
                value: values.value.ends_at,
                showIcon: true,
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

const calculateStartTime = (endTime: Date, type_id: number): Date => {
    if (!endTime) return new Date()
    const duration = type_id === 1 ? 30 : 60
    return new Date(endTime.getTime() - duration * 60 * 1000)
}

const onSubmit = async(fieldValues: Record<string, any>) => {
    const date = fieldValues.date.toLocaleDateString("en-GB").replace(/\//g, ".")
    const starts_at = fieldValues.starts_at.toLocaleTimeString("en-GB")
    const ends_at = fieldValues.ends_at.toLocaleTimeString("en-GB")
    const response = await postAppointment(doctor.value.id, weekNumber.value, {date: date, type_id: fieldValues.type_id, starts_at: starts_at, ends_at: ends_at})
    if(response.status < 400){
        toast.add({severity: 'success', summary: "Success", detail: response.message, life: 4000})
        console.log(response.status)
    }else {
        console.log(response.status)
        toast.add({severity: 'error', summary: "Error", detail: response.message, life: 4000})
    }
    await updateSchedule()
    isVisible.value = false
}

let isUpdating = false

const updateStartTime = () => {
    if (!isUpdating && values.value.starts_at) {
        isUpdating = true
        values.value.ends_at = calculateEndTime(values.value.starts_at, values.value.type_id)
        isUpdating = false
    }
};

const updateEndTime = () => {
    if (!isUpdating && values.value.ends_at) {
        isUpdating = true
        values.value.starts_at = calculateStartTime(values.value.ends_at, values.value.type_id)
        isUpdating = false
    }
};

const onHandleChange = (fieldValues: Record<string, any>) => {
    if (fieldValues.type_id !== values.value.type_id) {
        values.value.type_id = fieldValues.type_id
        updateEndTime()
    }

    if (fieldValues.date !== values.value.date) {
        values.value.date = fieldValues.date
    }

    if (fieldValues.starts_at !== values.value.starts_at) {
        values.value.starts_at = fieldValues.starts_at
        updateStartTime()
    } else if (fieldValues.ends_at !== values.value.ends_at) {
        values.value.ends_at = fieldValues.ends_at
        updateEndTime()
    }

    updateForm()
}

const updateForm = () => {
    formGroup.value[1].fields[0].value = values.value.date;
    formGroup.value[2].fields[0].value = values.value.starts_at;
    formGroup.value[2].fields[1].value = values.value.ends_at;


    nextTick(() => {
        formGroup.value[1].fields[0].value = values.value.date;
        formGroup.value[2].fields[0].value = values.value.starts_at;
        formGroup.value[2].fields[1].value = values.value.ends_at;
    });
};

watch(() => selectedSlot.value, (newDate) => {
    if (newDate) {
        values.value.date = new Date(newDate);
        values.value.starts_at = new Date(newDate);
        values.value.ends_at = calculateEndTime(values.value.starts_at, values.value.type_id);
        updateForm();
    }
}, { immediate: true });
</script>
