<script setup lang="ts">
    import BookingWindow from '~/core/Doctors/[id]/components/BookingWindow.vue';
    import Schedule from '~/core/Doctors/[id]/components/Schedule.vue';
    import type { BookingFormDefault, GetResponse } from '~/core/Doctors/[id]/types';
    import BackgroundBlur from '~/shared/components/BackgroundBlur.vue';
    import response from './mock-response';
    import { getDoctorProfile } from '~/core/Doctors/[id]/api';

    const route = useRoute();
    const id = parseInt(route.params.id.toString());

    const bookingWindowProps = ref<BookingFormDefault>(undefined);
    provide('toOpenBookingForm', (bookingWindowValues: BookingFormDefault) => {
        bookingWindowProps.value = bookingWindowValues;
    });

    const pageData = ref<GetResponse>(response);
    const loading = ref(true)

    // onMounted(() => getDoctorProfile(id)
    //     .then(response => {
    //         if (!response) throw new Error();
    //         pageData.value = response;
    //     })
    //     .catch(console.error)
    //     .finally(() => loading.value = false)
    // );
</script>

<template>
    <BackgroundBlur v-if="bookingWindowProps">
        <BookingWindow
            :day-index="bookingWindowProps.dayIndex"
            :slot-start-index="bookingWindowProps.slotStartIndex"
        />
    </BackgroundBlur>
    
    <Schedule v-if="id" :week="response.workTime"/>
    <p v-else>400</p>
</template>