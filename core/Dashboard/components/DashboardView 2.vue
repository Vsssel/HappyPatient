<template>
    <div>
        <DashboardFilter class="border-1"/>
        <div class="w-100 p-5 d-flex justify-content-center">
            <AboutUsView></AboutUsView>
        </div>
        <DashboardBody />
    </div>
</template>
<script setup lang="ts">
import DashboardFilter from './DashboardFilter.vue'
import DashboardBody from './DashboardBody.vue'
import AboutUsView from './AboutUsView.vue';
</script>