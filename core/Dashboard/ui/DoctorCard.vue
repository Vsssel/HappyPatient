<template>
        <NuxtLink 
            :to="`/doctors/${doctor.id}`"
            class="doctor-card text-decoration-none text-dark p-2 rounded"
        >
            <div class="d-flex flex-column align-items-center">
                <Avatar 
                    :url="doctor.avatarUrl" 
                    :title="avatarTitleOf(doctor)" 
                />
                <div class="d-flex flex-column align-items-center">
                    <span class="fs-6 fw-semibold">
                        {{ `${doctor.name} ${doctor.surname}` }}
                    </span>
                    <div class="d-flex flex-row justify-content-center p-2 flex-wrap w-100">
                       <label><i class="pi pi-user p-1"/>{{ doctor.category.title }}</label> 
                       <label><i class="pi pi-briefcase p-1"/>{{`${ Math.floor(doctor.expInMonthes / 12)} years` }}</label> 
                       <label><i class="pi pi-map-marker p-1" />{{ doctor.office.address }}</label> 
                    </div>
                </div>
            </div>
        </NuxtLink>
</template>
<script setup lang="ts">
import Avatar from '~/shared/components/profile/Avatar.vue'
import type { DoctorSearchResponse } from '../types'

defineProps<{ doctor: DoctorSearchResponse }>();

const avatarTitleOf = (doctor: DoctorSearchResponse) => (
    `${doctor.name} ${doctor.surname}'s avatar`
);

const calculateYearAndMonth = (months: number): string => {
    const years = Math.floor(months / 12);
    const monthsInYear = years * 12
    return `${years} years and ${months - monthsInYear} months`
}
</script>

<style scoped>
.doctor-card {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    border-radius: 10%;
    width: 200px;
}
.doctor-card:hover {
    background-color: rgba(225, 225, 225, 0.3);
}
</style>