<template>
    <div class="content-container d-flex mt-3 gap-2 flex-row align-self-center">
        <ProfileCard class="col-4" :id="id"/>
        <Skeleton class="w-100" height="40rem" ></Skeleton>
        <Schedule class="col-8" :id="id"/>
    </div>
</template>
<script setup lang="ts">
import Schedule from './[id]/ui/Schedule.vue'
import ProfileCard from './[id]/ui/ProfileCard.vue'
import Skeleton from 'primevue/skeleton'

const route = useRoute()
const id = parseInt(route.params.id.toString())
</script>
