<template>
    <div class="btn-container position-absolute w-100 h-100 bg-white">
        <button @click="onClick" v-if="isActual && me.isAuthorized()" :style="buttonStyle"
            class="bi bi-calendar-plus-fill p-0 d-flex justify-content-center align-items-center rounded"
        ></button>
    </div>
</template>
<script setup lang="ts">
import { SLOTS_PER_HOUR } from '~/shared/values';
import { isVisible, selectedSlot, slotIndexToDatetime } from '../values';
import type { SingleDoctorScheduleResponse } from '../types';
import { computed } from 'vue';
import me from '~/shared/stores/User';

const { date, worktime, slotIndex, now } = defineProps<{
    date: string,
    slotIndex: number,
    now: Date,
    worktime: SingleDoctorScheduleResponse['worktime']
}>();

const margin = 2;
const color = '#0D6EFD';
const buttonStyle = computed(() => ({
    width: `calc(100% - ${2 * margin}px)`,
    height: `calc(100% - ${2 * margin}px)`,
    margin: `${margin}px`,
    borderColor: color,
    fontSize: `${25/SLOTS_PER_HOUR}px`,
    color

}));

const isActual = computed(() => now < slotIndexToDatetime(worktime, date, slotIndex))
const onClick = () => {
    const seledtedDate= slotIndexToDatetime(worktime, date, slotIndex);
    const endTime = new Date(seledtedDate.getTime() + 30 * 60 * 1000)

    
    isVisible.value = true
    selectedSlot.value = seledtedDate
};


</script>
<style scoped>
button {
    opacity: 0;
    border: 2px solid;
    background-color: transparent;
    transition: 0.25s ease-out;
}

div.btn-container:hover button, button:focus {
    opacity: 1;
    outline: none;
}

button:active {
    background-color: rgb(195, 180, 210, 0.5);
}
</style>