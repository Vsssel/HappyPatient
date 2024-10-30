<template>
    <div class="d-flex w-100 gap-2 flex-column">
        <div class="d-flex gap-1 flex-row">
            <div class="card col-4 d-flex justify-content-center align-items-center gap-2">
                <DefaultAvatar width="150" height="150" font-size="70"/>
                <h5>{{ me.data.value?.name }} {{ me.data.value?.surname }}</h5>
                <span class="text-secondary">{{ me.data.value?.email }}</span>
                <span @click="logOut" class="text-danger">Log out<i class="pi pi-sign-out ms-2" /></span>
            </div>
            <div class="card col-8 p-2">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Personal Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Fist Name</th>
                            <th>{{ me.data.value?.name }}</th>
                        </tr>
                        <tr>
                            <th>Surname</th>
                            <th>{{ me.data.value?.surname }}</th>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <th>{{ me.data.value?.gender }}</th>
                        </tr>
                        <tr>
                            <th>Birth Date</th>
                            <th>{{ me.data.value?.birthDate }}</th>
                        </tr>
                        <tr>
                            <th>IIN</th>
                            <th>{{ me.data.value?.iin }}</th>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <th>{{ me.data.value?.role }}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card p-4 w-100">
            <h5>My Appointments</h5>
            <div class="d-flex flex-row gap-2 flex-wrap">
                <div v-for="appointment in appointments" class="card p-2 border-2 d-flex" style="width: 450px;">
                    <div class="p-1 ps-3 w-100 d-flex">
                        <span class="col-6 text-start">Doctor's name</span>
                        <span class="col-6 text-start">{{ appointment.doctor.name }} {{ appointment.doctor.surname }}</span>
                    </div>
                    <div class="p-1 ps-3 w-100 d-flex">
                        <span class="col-6 text-start">Service</span>
                        <span class="col-6 text-start">{{ appointment.type.name }} {{ appointment.category.title }}</span>
                    </div>
                    <div class="p-1 ps-3 w-100 d-flex">
                        <span class="col-6 text-start">Address</span>
                        <span class="col-6 text-start">{{ appointment.room.address }}</span>
                    </div>
                    <div class="p-1 ps-3 w-100 d-flex">
                        <span class="col-6 text-start">Room</span>
                        <span class="col-6 text-start">{{ appointment.room.title }}</span>
                    </div>
                    <div class="p-1 ps-3 w-100 d-flex justify-content-between align-items-center">
                        <span>
                            <i class="pi pi-calendar" />
                            {{ appointment.date }} {{ appointment.startTime }}
                        </span>
                        <button @click="addRoute(appointment)" class="btn btn-primary" style="font-size: 14px; border-radius: 12px;">Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import DefaultAvatar from '~/shared/components/header/DefaultAvatar.vue'
import me from '~/shared/stores/User'
import { useRouter } from 'vue-router'
import { getMyAppointments } from '../api'
import { onMounted } from 'vue'
import { appointments } from '../values'
import type { GetMyAppointmentsResponse } from '../types'

const router = useRouter()


const logOut = () => {
    me.signOut()
    router.push('/')
}

const addRoute = (appointment: GetMyAppointmentsResponse[0]) => {
    router.push(`myprofile/${appointment.id}`)
}

onMounted(async() => {
    appointments.value = (await getMyAppointments()).data
})
</script>