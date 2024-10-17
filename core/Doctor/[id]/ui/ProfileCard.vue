<template>
    <div>
    <Skeleton v-if="loader" height="40rem"></Skeleton>
    <div v-else class="card p-4 d-flex" style="border-radius: 20px;">
        <div class="d-flex align-items-center justify-content-center gap-2 flex-column">
            <div class="rounded-circle overflow-hidden" style="width: 100px; height: 100px;">
                <img :src="doctor?.avatarUrl" class="w-100 h-100" style="object-fit: cover;" alt="Doctor Avatar">
            </div>
            <div class="card-text d-flex flex-column align-items-center justify-content-center">
                <h4>{{ `${doctor?.name} ${doctor?.surname}` }}</h4>
                <div class="d-flex gap-2 align-items-center justify-content-center flex-row flex-wrap">
                    <span class="text-secondary align-items-center gap-1" style="font-size: 14px;">
                        <i class="bi bi-person-fill-add" style="font-size: 14px;" />
                        {{ doctor?.category.title }}
                    </span>
                    <span class="text-secondary d-flex align-items-center gap-1" style="font-size: 14px;">
                        <i class="pi pi-briefcase" style="font-size: 14px;" />
                        {{ doctor?.expInMonthes ? `${Math.floor(doctor.expInMonthes / 12)} years` : 'No experience' }}
                    </span>
                    <span class="text-secondary d-flex align-items-center gap-1" style="font-size: 14px;">
                        <i class="bi bi-coin" style="font-size: 14px;" />
                        {{ doctor?.price_list[0]?.halfHourPrice || 'Price not available' }}
                    </span>
                    <span class="text-secondary align-items-center gap-1" style="font-size: 14px;">
                        <i class="pi pi-map-marker" style="font-size: 14px;" />
                        {{ doctor?.office?.address.slice(0, 20) || 'Address not available' }}
                    </span>
                    <span class="text-secondary align-items-center gap-1" style="font-size: 14px;">
                        <i class="bi bi-building" style="font-size: 14px;" />
                        {{ doctor?.office?.title || 'Office not available' }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="doctor?.education.length > 0" class="d-flex align-items-center justify-content-center mt-3 mb-3 flex-row">
            <div class="card-text d-flex justify-content-start flex-column w-100">
                <h6 class="card-title text-secondary">Education</h6>
                <div v-for="education in doctor?.education" :key="education.id" class="d-flex flex-row flex-wrap gap-2">
                    <span class="fw-bolder" style="font-size: 14px;">
                        {{ education.organization }}
                    </span> 
                    <span style="font-size: 14px;">
                        {{ `GPA: ${parseFloat(education.gpa).toFixed(2)}/${education.gpaFrom}` }}
                    </span>
                    <span style="font-size: 14px;">
                        {{ education.endYear }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="doctor?.experience.length > 0" class="d-flex align-items-center justify-content-center mt-3 mb-3 flex-row">
            <div class="card-text d-flex justify-content-start flex-column w-100">
                <h6 class="card-title text-secondary">Experience</h6>
                <div v-for="experience in doctor?.experience" :key="experience.id" class="d-flex flex-row flex-wrap gap-2">
                    <span class="fw-bolder" style="font-size: 14px;">
                        {{ experience.organization }}
                    </span>
                    <span style="font-size: 14px;">
                        {{ experience.position }}
                    </span>
                    <span style="font-size: 14px;">
                        {{ experience.endDate || 'Ongoing' }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="doctor?.price_list.length > 0" class="d-flex mt-3 mb-3 flex-row">
            <div class="d-flex justify-content-start flex-column w-100">
                <h6 class="text-secondary">Price list</h6>
                <div v-for="price in doctor?.price_list" :key="price.typeId" class="d-flex w-100 flex-row justify-content-between gap-2">
                    <label style="font-size: 14px;">
                        {{ price.typeName }}
                    </label>
                    <label style="font-size: 14px;">
                        {{ `${price.halfHourPrice}₸` }}
                    </label>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { getDoctorProfile } from '../api'
import { ref, onMounted, defineProps } from 'vue'
import type { SingleDoctorProfileResponse } from '../types'
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
    id: number;
}>();

const loader = ref<boolean>(true);
const doctor = ref<SingleDoctorProfileResponse | null>(null);

onMounted(async () => {
    try {
        doctor.value = (await getDoctorProfile({ id: props.id })).data;
    } finally {
        loader.value = false;
    }
});
</script>
