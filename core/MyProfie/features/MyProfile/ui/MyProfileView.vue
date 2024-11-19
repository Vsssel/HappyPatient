<template>
    <div class="d-flex w-100 gap-2 flex-column">
        <div class="p-1 d-flex flex-column align-items-center gap-4 w-100">
            <div class="d-flex flex-row justify-content-between align-items-center">
                <div class="d-flex gap-2">
                    <div class="d-flex gap-2">
                        <RadioButton v-model="filterBy" value="0" name="upcoming" />
                        <label for="upcoming" class="text">Upcoming</label>
                    </div>
                    <div class="d-flex gap-2">
                        <RadioButton v-model="filterBy" value="1" name="upcoming" />
                        <label for="upcoming" class="text">Past</label>
                    </div>
                    <div class="d-flex gap-2">
                        <RadioButton v-model="filterBy" value="2" name="upcoming" />
                        <label for="upcoming" class="text">All</label>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-row justify-content-center gap-1 flex-wrap">
                <h5 v-if="appointments?.length === 0" class="p-5 text-secondary">{{ 'No Data' }}</h5>
                <div v-else v-for="appointment in filteredAppointments" class="card appointment-card p- border-2 d-flex">
                    <table>
                        <tbody class="d-flex flex-column gap-2 p-2">
                            <tr v-for="data in formatAppointmentInfoTable(appointment)" class="d-flex flex-row justify-content-between">
                                <th class="col-5">
                                    <span class="text fw-bold">
                                    {{ data.title }} 
                                    </span>
                                </th>
                                <th class="col-7 text-end">
                                    <span class="text">
                                        {{ data.data }}
                                    </span>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <div class="p-1 ps-3 w-100 d-flex justify-content-between align-items-center p-2">
                        <span class="text">
                            <i class="pi pi-calendar" />
                            {{ appointment.date }} {{ appointment.startTime }}
                        </span>
                        <button @click="addRoute(appointment)" class="btn btn-sm text btn-primary" style="font-size: 14px; border-radius: 12px;">Details</button>
                    </div>
                </div>
            </div>
            <Paginator 
                :rows="6" 
                class="w-100"
                :totalRecords="filteredAppointments?.length"
                template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getMyAppointments } from '../api'
import { onMounted } from 'vue'
import { appointments, filterBy } from '../values'
import type { GetMyAppointmentsResponse } from '../types'
import { ref } from 'vue'
import { filterAppointments } from '../utils/filterAppointments'
import RadioButton from 'primevue/radiobutton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { formatAppointmentInfoTable } from '../utils/formatAppointmentInfoTable'

const router = useRouter()
const filteredAppointments = ref<GetMyAppointmentsResponse>()

const addRoute = (appointment: GetMyAppointmentsResponse[0]) => {
    router.push(`myprofile/${appointment.id}`)
}

onMounted(async() => {
    appointments.value = (await getMyAppointments()).data
    filteredAppointments.value = filterAppointments()
})

watch(filterBy , ()=> {
    filteredAppointments.value = filterAppointments()
})
</script>