<template>
    <div>
    <Skeleton v-if="loader" height="40rem"></Skeleton>
    <div v-else class="card p-3 gap-2 d-flex" style="border-radius: 20px;">
        <div class="d-flex align-items-center justify-content-center gap-2 flex-column">
            <div class="rounded-circle overflow-hidden" style="width: 100px; height: 100px;">
                <img :src="doctor?.avatarUrl" class="w-100 h-100" style="object-fit: cover;" alt="Doctor Avatar">
            </div>
            <div class="card-text d-flex flex-column align-items-center justify-content-center">
                <h5>{{ `${doctor?.name} ${doctor?.surname}` }}</h5>
                <div class="d-flex gap-2 align-items-center justify-content-center flex-row flex-wrap">
                    <span class="text-secondary align-items-center gap-1 text">
                        <i class="bi bi-person-fill-add text" />
                        {{ doctor?.category.title }}
                    </span>
                    <span class="text-secondary d-flex align-items-center gap-1 text">
                        <i class="pi pi-briefcase text" />
                        {{ doctor?.expInMonthes ? `${Math.floor(doctor.expInMonthes / 12)} years` : 'No experience' }}
                    </span>
                    <span class="text-secondary d-flex align-items-center gap-1 text">
                        <i class="bi bi-coin text" />
                        {{ doctor?.price_list[0]?.price || 'Price not available' }}
                    </span>
                    <span class="text-secondary align-items-center gap-1 text">
                        <i class="pi pi-map-marker text" />
                        {{ doctor?.office?.address.slice(0, 20) || 'Address not available' }}
                    </span>
                    <span class="text-secondary align-items-center gap-1 text">
                        <i class="bi bi-building text" />
                        {{ doctor?.office?.title || 'Office not available' }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="doctor && doctor?.education.length > 0" class="d-flex align-items-center justify-content-center  flex-row">
            <div class="card-text d-flex justify-content-start flex-column w-100">
                <h6 class="card-title text-secondary text">Education</h6>
                <div v-for="education in doctor?.education" :key="education.id" class="d-flex flex-row flex-wrap gap-2">
                    <span class="fw-bolder text">
                        {{ education.organization }}
                    </span> 
                    <span class="text">
                        {{ `GPA: ${(education.gpa)}/${education.gpaFrom}` }}
                    </span>
                    <span class="text">
                        {{ education.endYear }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="doctor && doctor?.experience.length > 0" class="d-flex align-items-center justify-content-center  flex-row">
            <div class="card-text d-flex justify-content-start flex-column w-100">
                <h6 class="card-title text-secondary text">Experience</h6>
                <div v-for="experience in doctor?.experience" :key="experience.id" class="d-flex flex-row flex-wrap gap-2">
                    <span class="fw-bolder text">
                        {{ experience.organization }}
                    </span>
                    <span class="text">
                        {{ experience.position }}
                    </span>
                    <span class="text">
                        {{ experience.endDate || 'Ongoing' }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="doctor && doctor?.price_list.length > 0" class="d-flex  flex-row">
            <div class="d-flex justify-content-start flex-column w-100">
                <h6 class="text-secondary text">Price list</h6>
                <div v-for="price in doctor?.price_list" :key="price.typeId" class="d-flex w-100 flex-row justify-content-between gap-2">
                    <label class="text">
                        {{ price.typeName }}
                    </label>
                    <label class="text">
                        {{ `${price.price}₸` }}
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
import Skeleton from 'primevue/skeleton'
import { useRoute } from 'vue-router'
import { addBreadcrumb } from '~/shared/stores/useBreadCrumb'
import { doctor } from '../values'

const route = useRoute()
const props = defineProps<{
    id: number;
}>();

const loader = ref<boolean>(true);

onMounted(async () => {
    try {
        doctor.value = (await getDoctorProfile({ id: props.id })).data;
        addBreadcrumb({name: `${doctor.value?.name} ${doctor.value?.surname}`, path: route.fullPath})
    } finally {
        loader.value = false;
    }
})

</script>
