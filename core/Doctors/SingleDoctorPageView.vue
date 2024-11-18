<template>
    <div class="content-container p-3 d-flex mt-3 gap-2 flex-column flex-md-row align-self-center">
        <ProfileCard class="col-12 col-md-4" :id="id" />
        <Schedule class="col-12 col-md-8" />
    </div>
    <BookingWindow />
</template>

<script setup lang="ts">
import Schedule from './[id]/ui/Schedule.vue'
import ProfileCard from './[id]/ui/ProfileCard.vue'
import BookingWindow from './[id]/ui/BookingWindow.vue'
import { id } from './[id]/values'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

id.value = parseInt(route.params.id.toString())
</script>
