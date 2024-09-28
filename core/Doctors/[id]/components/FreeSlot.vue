<template>
    <div class="btn-container position-absolute w-100 h-100 bg-white">
        <button @click="onClick" v-if="isActual" :style="buttonStyle"
            class="bi bi-calendar-plus-fill p-0 d-flex justify-content-center align-items-center rounded"
        ></button>
    </div>
</template>


<script setup lang="ts">
    import { SLOTS_PER_HOUR } from '~/shared/values';
    import type { BookingFormDefault } from '../types';
    import { slotIndexToDatetime } from '../values';

    const { date, dayIndex, slotIndex, now } = defineProps<{
        date: string,
        dayIndex: number,
        slotIndex: number,
        now: Date
    }>();
    const openBookingFormEvent = inject<(bookingWindowValues: BookingFormDefault) => void>('toOpenBookingForm');

    const margin = 2;
    const color = '#8bcfcc';
    const buttonStyle = computed(() => ({
        width: `calc(100% - ${2 * margin}px)`,
        height: `calc(100% - ${2 * margin}px)`,
        margin: `${margin}px`,
        borderColor: color,
        fontSize: `${25/SLOTS_PER_HOUR}px`,
        color

    }));

    const isActual = computed(() => now < slotIndexToDatetime(date, slotIndex));

    const onClick = () => {
        if (openBookingFormEvent)
            return openBookingFormEvent({ dayIndex, slotStartIndex: slotIndex });
        console.error();
    }
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