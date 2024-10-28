<template>
        <NuxtLink 
            :to="`/doctor/${doctor.id}`"
            class="doctor-card text-decoration-none text-dark pt-3 pb-3 p-0 rounded"
            @click="addBreadcrumb({name: `${doctor.name} ${doctor.surname}`, path: `/doctor/${doctor.id}`})"
        >
            <div class="d-flex flex-column align-items-center">
                <Avatar 
                    :url="doctor.avatarUrl" 
                    :title="avatarTitleOf(doctor)" 
                />
                <div class="d-flex w-100 flex-column align-items-center">
                    <span class="fs-6 fw-semibold">
                        {{ `${doctor.name} ${doctor.surname}` }}
                    </span>
                    <div class="d-flex flex-column align-items-center w-100">
                        <div class="d-flex flex-row w-100 justify-content-around">
                            <label class="mt-1 mb-1"><i class="pi pi-user me-1"/>{{ doctor.category.title }}</label> 
                            <label class="mt-1 mb-1"><i class="pi pi-briefcase me-1"/>{{`${ Math.floor(doctor.expInMonthes / 12)} years` }}</label> 
                        </div>
                       <label class="mt-1 mb-1"><i class="pi pi-map-marker me-1" />{{ `${doctor.office.address.length > 10 ? `${doctor.office.address.slice(0, 10)}...` : doctor.office.address}`}}</label> 
                       <label class="mt-1 mb-1"><i class="bi bi-coin me-1" />{{ `10.000 ₸`}}</label> 
                    </div>
                    <button class="btn btn-sm btn-primary m-2">
                        {{ "View doctor" }}
                    </button>
                </div>
            </div>
        </NuxtLink>
</template>
<script setup lang="ts">
import Avatar from '~/shared/components/profile/Avatar.vue'
import type { DoctorSearchResponse } from '../types'
import { addBreadcrumb } from '~/shared/stores/useBreadCrumb';

defineProps<{ doctor: DoctorSearchResponse }>();

const avatarTitleOf = (doctor: DoctorSearchResponse) => (
    `${doctor.name} ${doctor.surname}'s avatar`
);

</script>