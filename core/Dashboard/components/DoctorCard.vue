<script setup lang="ts">
    import Avatar from '~/shared/components/profile/Avatar.vue';
    import type { DoctorsearchResponse } from '../types';
    import { capitalizeFirstLetter } from '../values';

    defineProps<{ doctor: DoctorsearchResponse }>();

    const avatarTitleOf = (doctor: DoctorsearchResponse) => (
        `${doctor.name} ${doctor.surname}'s avatar`
    );
</script>


<template>
    <NuxtLink :to="`/doctors/${doctor.id}`"
        class="doctor-card text-decoration-none text-secondary p-2"
    >
        <div class="d-flex align-items-center gap-3">
            <Avatar url="https://img.freepik.com/premium-vector/vector-doctor-medical-hospital-health-medicine-illustration-care-man-clinic-people-profes_1013341-112928.jpg" :title="avatarTitleOf(doctor)" />
            <div class="d-flex flex-column gap-2">
                <span class="fs-5 fw-semibold">
                    {{ `${doctor.name} ${doctor.surname}` }}
                </span>
                <div class="d-flex gap-4">
                    <span>{{ capitalizeFirstLetter(doctor.category.title) }}</span>
                    <span class="d-flex gap-1">
                        Experience in
                        <span v-if="doctor.experience > 12">
                            {{ Math.floor(doctor.experience / 12) }}
                        </span>
                        <span style="font-size: 10px;">
                            {{ doctor.experience % 12 }} / 12
                        </span>
                        years
                    </span>
                </div>

            </div>
        </div>
    </NuxtLink>
</template>


<style scoped>
    .doctor-card {
        flex-grow: 2;
        background-color: rgba(110, 231, 183, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        transition: 0.3s ease-out;
    }
    .doctor-card:hover {
        background-color: rgba(110, 231, 183, 0.3);
    }
    .doctor-card:active {
        background-color: rgba(110, 231, 183, 0.2);
    }

    .doctor-card span {
        line-height: 100%;
    }
</style>