<template>
    <div class="col-md-3 col-12">
        <div class="card d-flex flex-column align-items-center pt-3 pb-3">
            <h6 class="fw-bold">
                {{ 'Free slots' }}
            </h6>
            <div class="d-flex align-items-center gap-2 w-100 flex-column justify-content-center">
                <span v-if="!freeSlots.length">
                    {{ 'No free slots' }}
                </span>
                <div 
                  v-else 
                  v-for="freeSlot in freeSlots"
                  :key="freeSlot.startTime"
                  :class="['col-10 text-center rounded border-0 p-1', formattedDate(freeSlot) === formattedDate({ startTime: timeToString(values.startsAt), endTime: timeToString(values.endsAt) }) ? 'bg-primary text-white' : 'secondary-bg secondary-text']" style="cursor: pointer;" @click="setTime(freeSlot)"
                >
                   {{ formattedDate(freeSlot) }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { GetMyAppointmentResourseResponse } from '../types'
import { watch, ref } from 'vue'
import { resource, values } from '../values'
import { updateEndTime, updateForm } from '../utils'
import { timeToString } from '~/shared/utils'

const freeSlots = ref<GetMyAppointmentResourseResponse['freeSlots']>(resource.value?.freeSlots || [])

const formattedDate = (freeSlot: GetMyAppointmentResourseResponse['freeSlots'][0]): string => {
    const [startHour, startMinute] = freeSlot.startTime.split(':')
    const [endHour, endMinute] = freeSlot.endTime.split(':')
    console.log(`${startHour}:${startMinute} - ${endHour}:${endMinute}`)
    return `${startHour}:${startMinute} - ${endHour}:${endMinute}`
}

const setTime = (freeSlot: GetMyAppointmentResourseResponse['freeSlots'][0]) => {
    const [startHour, startMinute] = freeSlot.startTime.split(':').map(Number)
    const [endHour, endMinute] = freeSlot.endTime.split(':').map(Number)
    const startDate = new Date(2024, 1, 1, startHour, startMinute, 0)
    const endDate = new Date(2024, 1, 1, endHour, endMinute, 0)
    values.value.startsAt = startDate
    values.value.endsAt = endDate
    updateEndTime()
    updateForm()
}

watch(resource, (newValue) => {
    freeSlots.value = newValue?.freeSlots || []
})
</script>
<style scoped>
.secondary-bg{
    background-color: rgb(108 117 125 / 10%) !important;
}

.secondary-text{
    color: rgb(108 117 125);
}
</style>
