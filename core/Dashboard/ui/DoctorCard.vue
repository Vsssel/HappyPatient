<template>
        <NuxtLink 
            :to="`/doctors/${doctor.id}`"
            class="doctor-card w-100 text-decoration-none text-dark p-2 mb-2 rounded"
        >
            <div class="d-flex align-items-center gap-3">
                <Avatar 
                    :url="doctor.avatarUrl" 
                    :title="avatarTitleOf(doctor)" 
                />
                <div class="d-flex flex-column gap-2">
                    <span class="fs-5 fw-semibold">
                        {{ `${doctor.name} ${doctor.surname}` }}
                    </span>
                    <div class="d-flex gap-2">
                       <label class="card p-1 message info">{{ doctor.category.title }}</label> 
                       <label class="card p-1 message success">{{ `Exp: ${calculateYearAndMonth(doctor.expInMonthes)}` }}</label> 
                       <label class="card p-1 message warn">{{ doctor.office.address }}</label> 
                       <label class="card p-1 message error">{{ doctor.office.title }}</label> 
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
.info{
    background-color: rgba(17, 136, 255, 0.1);
    border: 0.5px solid rgb(17, 136, 255);
    color: rgb(17, 136, 255);
}
.success{
    background-color: rgba(5, 190, 54, 0.1);
    border: 0.5px solid rgb(5, 190, 54);
    color: rgb(5, 190, 54);
}
.warn{
    background-color: rgba(225, 185, 3, 0.1);
    border: 0.5px solid rgb(225, 185, 3);
    color: rgb(225, 185, 3);
}
.error{
    background-color: rgba(229, 88, 88, 0.1);
    border: 0.5px solid rgb(229, 88, 88);
    color: rgb(229, 88, 88);
}
.message{
    font-weight: bold;
    font-size: 11px;
    border-radius: 20px;
}
.doctor-card {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);;
}
.doctor-card:hover {
    background-color: rgba(225, 225, 225, 0.3);
}
</style>