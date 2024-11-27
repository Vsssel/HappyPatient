<template>
    <div class="btn-container position-absolute w-100 h-100 bg-white" />
</template>
<script setup lang="ts">
import { SLOTS_PER_HOUR } from '~/shared/values'
import type { MyScheduleGetResponse } from '../types'
import { computed } from 'vue'


const margin = 2;
const color = '#0D6EFD';
const buttonStyle = computed(() => ({
    width: `calc(100% - ${2 * margin}px)`,
    height: `calc(100% - ${2 * margin}px)`,
    margin: `${margin}px`,
    borderColor: color,
    fontSize: `${25/SLOTS_PER_HOUR}px`,
    color

}))
</script>