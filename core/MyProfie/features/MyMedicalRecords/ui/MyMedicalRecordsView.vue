<template>
    <div class="d-flex w-100 h-100 flex-column justify-content-between">
        <div class="p-1 d-flex align-items-center flex-column gap-4 w-100">
            <div class="d-flex flex-row justify-content-between align-items-center">
                <div class="d-flex gap-2">
                    <div class="d-flex gap-2">
                        <RadioButton v-model="filterBy" value="test" name="upcoming" />
                        <label for="upcoming" class="text">Tests</label>
                    </div>
                    <div class="d-flex gap-2">
                        <RadioButton v-model="filterBy" value="anamnesis" name="upcoming" />
                        <label for="upcoming" class="text">Anamnesis</label>
                    </div>
                    <div class="d-flex gap-2">
                        <RadioButton v-model="filterBy" value="conclusion" name="upcoming" />
                        <label for="upcoming" class="text">Conclusions</label>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-row justify-content-center gap-1 flex-wrap">
                <div v-if="!records?.page.length" class="d-flex align-items-center justify-content-center">
                    <img src="../../../../../assets/no_data.jpg" class="col-6 col-md-12">
                </div>
                <div 
                    v-else 
                    v-for="record in records.page" 
                    :key="record.content" 
                    class="card appointment-card p-2 ps-3 border-2 gap-3 d-flex"
                >
                    <div class="d-flex flex-row align-items-center justify-content-between">
                        <div class="d-flex gap-1 flex-column">
                            <span class="text">
                                <span class="fw-bold">
                                    {{ capitalizeFirstLetter(record.type) }}
                                </span> 
                                by {{ record.doctor.name }} {{ record.doctor.surname }}
                            </span>
                            <span class="text">
                                {{ record.addedTime }}
                            </span>
                        </div>
                        <div class="btn btn-sm" style="background-color: #FEE2E2; color: #7F1D1D;">
                            <i class="bi bi-emoji-angry text" />
                            Report
                        </div>
                    </div>
                    <div class="d-flex">
                        <span class="text">
                            {{ record.content }}
                        </span>
                    </div>
                    <div class="w-100 d-flex justify-content-end align-items-center">
                        <button 
                            @click="addRoute(record)" 
                            class="btn btn-sm text btn-primary" 
                            style="font-size: 14px; border-radius: 12px;"
                        >
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Paginator 
            :rows="6" 
            class="w-100"
            :totalRecords="records?.total"
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
            @page="updatePage"
        />
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getMyMedicalRecords } from '../api';
import { ref, onMounted, watch } from 'vue';
import type { GetMyMedicalRecordsResponse } from '../types';
import RadioButton from 'primevue/radiobutton';
import { RecordType } from '../types';
import { capitalizeFirstLetter } from '~/shared/utils';
import { records } from '../values';
import Paginator, { type PageState } from 'primevue/paginator';

const router = useRouter();
const filterBy = ref<RecordType>(RecordType.TEST);
const offset = ref<number>(0)

const addRoute = (record: GetMyMedicalRecordsResponse['page'][0]) => {
     router.push(`myprofile/${record.appointment.id}`);
};

const fetchRecords = async () => {
    records.value = (await getMyMedicalRecords({
        record_type: filterBy.value,
        limit: 6,
        offset: offset.value,
    })).data;
};

const updatePage = async (event: PageState) => {
    offset.value = event.first
    await fetchRecords()
};

onMounted(fetchRecords);

watch(filterBy, fetchRecords);
</script>
