<script setup lang="ts">
    import BookingWindow from '~/core/Doctor/[id]/components/BookingWindow.vue';
    import Schedule from '~/core/Doctor/[id]/components/Schedule.vue';
    import type { BookingFormDefault, GetProfileResponse } from '~/core/Doctor/[id]/types';
    import BackgroundBlur from '~/shared/components/BackgroundBlur.vue';
    import response from './mock-response';
    import { getDoctorProfile } from '~/core/Doctor/[id]/api'

    const route = useRoute();
    const id = parseInt(route.params.id.toString());

    const bookingWindowProps = ref<BookingFormDefault>(undefined);
    provide('toOpenBookingForm', (bookingWindowValues: BookingFormDefault) => {
        bookingWindowProps.value = bookingWindowValues;
    });

    const pageData = ref<GetProfileResponse>(response);
    const loading = ref(true);

    onMounted(() => getDoctorProfile(id)
        .then(response => {
            if (!response) throw new Error();
            pageData.value = response;
        })
        .catch(console.error)
        .finally(() => loading.value = false)
    );
</script>

<template>
    <Loader :is-loading="loading">
        <BackgroundBlur v-if="bookingWindowProps">
            <BookingWindow
                :day-index="bookingWindowProps.dayIndex"
                :slot-start-index="bookingWindowProps.slotStartIndex"
            />
        </BackgroundBlur>
        
        <Schedule v-if="id" :id="id" :week="response.workTime"/>
    </Loader>
        
</template>