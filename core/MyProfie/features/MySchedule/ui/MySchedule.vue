<template>
    <div id="schedule-container" class="d-flex flex-column">
        <div class="d-flex col-12 col-md-6 col-xl-4 align-self-right justify-content-between align-items-center text">
            <RoundButton 
                @click="weekNumber--" 
                :disabled="weekNumber <= 0"
                class="pi pi-chevron-left" style="color: #888;"
            />
            <span v-if="weekDates && weekDates.length > 0">{{ `${weekDates[0]} - ${weekDates[weekDates.length - 1]}` }}</span>
            <RoundButton 
                @click="weekNumber++" 
                :disabled="weekNumber >= MAX_WEEKS_AHEAD"
                class="pi pi-chevron-right" 
                style="color: #888;"
            />
        </div>
        <Table v-if="schedule && schedule.length > 0" :week="weekDates" :worktime="worktime">
            <template v-for="slot in slots" #[slotKey(slot)] >
                <NotAvailableSlot :slot="slot" />
            </template>
            <template v-for="emptySlot in whereNoSlots" #[emptySlotKey(emptySlot)]>
                <FreeSlot v-if="emptySlot.status == WorkingStatus.AVAILABLE" />
            </template>
        </Table>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { slotKey, emptySlotKey, weekNumber, schedule, worktime, weekDates, whereNoSlots, slots } from '../values'
import Table from '~/shared/components/Table/Table.vue'
import NotAvailableSlot from './NotAvailableSlot.vue'
import FreeSlot from './FreeSlot.vue'
import RoundButton from '~/shared/components/button/RoundButton.vue'
import { MAX_WEEKS_AHEAD } from '~/shared/values'
import { updateSchedule } from '../utils'
import { WorkingStatus } from '../types'

const loading = ref(false);


onMounted(async () => {
    try{
        loading.value = true
        await updateSchedule()
    }finally{
        loading.value = false
    }
})

watch(weekNumber, async () => {
    try{
        loading.value = true
        await updateSchedule()
    }finally{
        loading.value = false
    }
})
</script>

<style scoped>
    #schedule-container {
        padding: 10px;
        padding-top: 7.5px;
        gap: 5px;
        border: 1px solid #ddd;
        border-radius: 20px;
        background-color: white;
    }
</style>
