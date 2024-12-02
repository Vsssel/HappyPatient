<template>
    <div class="content-container p-4 d-flex align-items-center justify-content-center">
        <img src="../../assets/no-data.png" class="col-5">
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    title: string
}>()
</script>