<template>
    <div class="content-container d-flex align-self-center">
        <Tabs value="0" class="w-100">
            <TabList>
                <Tab value="0">My Profile</Tab>
                <Tab value="1">My Medical History</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <MyProfileView />
                </TabPanel>
                <TabPanel value="1">
                    <MyMedicalHistoryView />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import MyProfileView from './features/MyProfile/ui/MyProfileView.vue';
import MyMedicalHistoryView from './features/MyMedicalHistory/MyMedicalHistoryView.vue';
</script>