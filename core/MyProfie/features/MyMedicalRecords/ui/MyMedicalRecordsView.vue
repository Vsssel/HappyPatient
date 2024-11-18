<template>
    <div class="d-flex w-100 gap-2 flex-column">
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
                <h5 v-if="!records?.page.length" class="p-5 text-secondary">{{ 'No Data' }}</h5>
                <div 
                    v-else 
                    v-for="record in records.page" 
                    :key="record.content" 
                    class="card appointment-card p- border-2 d-flex" 
                    style="background-color: rgba(0, 149, 255, 0.1);"
                >
                    <DataTable :value="formatRecordTable(record)">
                        <Column field="title" class="col-4 fw-medium" />
                        <Column field="data" class="col-7" />
                    </DataTable>
                    <div class="p-1 ps-3 w-100 d-flex justify-content-between align-items-center p-2">
                        <span class="text">
                            <i class="pi pi-calendar" />
                            {{ record.addedTime }}
                        </span>
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
            <Paginator 
                :rows="6" 
                class="w-100"
                :totalRecords="records?.total"
                template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                @page="updatePage"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getMyMedicalRecords } from '../api';
import { ref, onMounted, watch } from 'vue';
import type { GetMyMedicalRecordsResponse } from '../types';
import RadioButton from 'primevue/radiobutton';
import { RecordType } from '../types';
import { formatRecordTable } from '../utils';
import { records } from '../values';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
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
