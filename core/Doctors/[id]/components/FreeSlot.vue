<template>
    <div class="btn-container position-absolute w-100 h-100 bg-white">
        <button @click="onClick" v-if="isActual"
            class="p-0 d-flex justify-content-center align-items-center text-center text-secondary rounded"
            :style="{ margin: `${margin}px`, width: `calc(100% - ${2 * margin}px)`, height: `calc(100% - ${2 * margin}px)`, borderColor: color }"
        >
            <PlusCalendar :size="`${35/SLOTS_PER_HOUR}px`" :color="color"/>
        </button>
    </div>
</template>


<script setup lang="ts">
    import { SLOTS_PER_HOUR } from '~/shared/values';
    import type { BookingFormDefault } from '../types';
    import { slotIndexToDatetime } from '../values';
    import PlusCalendar from '~/shared/components/icons/PlusCalendar.vue';

    const { date, dayIndex, slotIndex, now } = defineProps<{
        date: string,
        dayIndex: number,
        slotIndex: number,
        now: Date
    }>();
    const openBookingFormEvent = inject<(bookingWindowValues: BookingFormDefault) => void>('toOpenBookingForm');

    const margin = 2;
    const color = '#8bcfcc';

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