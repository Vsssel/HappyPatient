<template>
    <div class="w-100">
        <table class="table table-striped">
            <div v-if="props.doctor" class="w-100 d-flex gap-2">
                <div class="card w-50 d-flex flex-row align-items-center">
                    <img :src="props.doctor?.avatarUrl || '/path/to/placeholder-image.jpg'" 
                         :alt="'Doctor image'" 
                         style="width: 55px; height: 55px; object-fit: cover;" 
                         class="rounded-circle"/>
                    <div class="d-flex flex-column">
                        <span v-if="props.doctor.name && props.doctor.surname" class="fw-medium">{{ props.doctor.name }} {{ props.doctor.surname }}</span>
                        <span v-if="props.doctor?.category" style="font-size: 12px;" class="text-secondary">{{ doctor.category.title }}</span>
                    </div>
                </div>
                <div class="card w-50 d-flex flex-row align-items-center ps-2">
                    <DefaultAvatar />
                    <div class="d-flex flex-column">
                        <span class="fw-medium">{{ me.data.value?.name }} {{ me.data.value?.surname }}</span>
                        <span style="font-size: 12px;" class="text-secondary">Patient</span>
                    </div>
                </div>
            </div>
        </table>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import me from '~/shared/stores/User'
import DefaultAvatar from '../header/DefaultAvatar.vue'
import type { SingleDoctorProfileResponse } from '~/core/Doctor/[id]/types'
import type { GetMySingleAppointmentResponse } from '~/core/MyProfie/[id]/types'

const props = defineProps<{
    doctor: SingleDoctorProfileResponse | GetMySingleAppointmentResponse['doctor'],
}>()

</script>
