<script setup lang="ts">
import DoctorCard from './DoctorCard.vue';
import { doctors } from '../values';
import Loader from '~/shared/components/loader/Loader.vue';

</script>


<template>
    <div class="w-100 d-flex justify-content-center">
        <div v-if="doctors" class="d-flex card p-3 flex-column col-5 flex-wrap gap-2">
            <DoctorCard :doctor="doctor"
                v-for="doctor in doctors" :key="doctor.id"
            />
        </div>
    </div>
</template>