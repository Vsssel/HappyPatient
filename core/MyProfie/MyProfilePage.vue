<template>
    <div class="content-container m-2 gap-2 p-2 d-flex flex-column flex-md-row align-self-center">
        <div class="gap-1 col-12 col-md-3 flex-row">
            <div class="card p-3 d-flex justify-content-center align-items-center gap-2">
                <DefaultAvatar width="100" height="100" font-size="50" :name="me.data.value?.name" :surname="me.data.value?.surname"/>
                <h6>{{ me.data.value?.name }} {{ me.data.value?.surname }}</h6>
                <span class="text-secondary text">{{ me.data.value?.email }}</span>
                <span class="text-secondary text">{{ me.data.value?.iin }}</span>
                <span class="text-secondary text">
                    <i class="bi bi-cake2"></i>
                    {{ me.data.value?.birthDate }}
                </span>
                <span @click="logOut" class="btn btn-sm btn-log-out mt-3 w-100 text-center rounded">Log out<i class="pi pi-sign-out ms-2" /></span>
            </div>
        </div>
        <Tabs :value="me.data.value?.role === UserRoles.Doctor ? '0' : '1'" class="col-12 col-md-9 card">
            <TabList>
                <Tab value="0">My Schedule</Tab>
                <Tab value="1">My Appointments</Tab>
                <Tab value="2">My Medical Records</Tab>
            </TabList>
            <TabPanels class="h-100">
                <TabPanel value="0" class="h-100">
                    <MySchedule></MySchedule>
                </TabPanel>
                <TabPanel value="1" class="h-100">
                    <MyProfileView />
                </TabPanel>
                <TabPanel value="2" class="h-100">
                    <MyMedicalRecordsView />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import MyProfileView from './features/MyProfile/ui/MyProfileView.vue'
import MyMedicalRecordsView from './features/MyMedicalRecords/ui/MyMedicalRecordsView.vue'
import me from '~/shared/stores/User'
import DefaultAvatar from '~/shared/components/header/DefaultAvatar.vue'
import { useRouter } from 'vue-router'
import MySchedule from './features/MySchedule/ui/MySchedule.vue'
import { UserRoles } from '~/shared/enum'

const router = useRouter()

const logOut = () => {
    me.signOut()
    router.push('/auth/signin')
}
</script>
<style scoped>
.btn-log-out{
    background-color: rgb(220 53 69 / 10%);
    color: rgb(220 53 69 / 80%) !important;
}

.btn-log-out:hover{
    background-color: rgb(220 53 69);
    color: white !important;
}
</style>