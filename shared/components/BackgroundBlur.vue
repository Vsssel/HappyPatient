// to do fix

<template>
    <main @keydown="onEscape"
        class="position-absolute w-100 d-flex justify-content-center"
    >
        <slot></slot>
    </main>
</template>


<script setup lang="ts">
    import type { BookingFormDefault } from '~/core/Doctors/[id]/types';

    const openBookingFormEvent = inject<(bookingWindowProps: BookingFormDefault) => void>('toOpenBookingForm');
    const onEscape = (event: KeyboardEvent) => {
        console.log('efkefkefk');
        
        if (event.key == 'escape' && openBookingFormEvent)
            return openBookingFormEvent(undefined);
    };
</script>


<style scoped>
    main {
        height: 100vh;
        padding-top: 20%;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 3;
    }
</style>