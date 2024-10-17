<template>
    <div id="schedule-container" class="d-flex flex-column">
        <div class="d-flex col-4 align-self-right justify-content-between align-items-center" style="font-size: 13px;">
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
        <Table v-if="schedule && schedule.length > 0" :week="weekDates">
            <template v-for="slot in slots" >
                <NotAvailableSlot :slot="slot" />
            </template>
            <template v-for="emptySlot in whereNoSlots" >
                <FreeSlot v-if="emptySlot.status == WorkingStatus.AVAILABLE"
                    :day-index="emptySlot.dayIndex" :slot-index="emptySlot.slotIndex"
                    :date="weekDates[emptySlot.dayIndex]" :now="now"
                />
            </template>
        </Table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { SlotStatus, WorkingStatus, type EmptySlot, type SingleDoctorScheduleResponse, type SlotInfo } from '../types';
import { SLOTS_COUNT, timeToSlotIndex, slotKey, emptySlotKey } from '../values';
import Table from './Table.vue';
import NotAvailableSlot from './NotAvailableSlot.vue';
import FreeSlot from './FreeSlot.vue';
import RoundButton from '~/shared/components/button/RoundButton.vue';
import { getDoctorSchedule } from '../api'
import { getWeekDates } from '~/shared/values'
import { MAX_WEEKS_AHEAD } from '~/shared/values'

const props = defineProps<{ 
    id: number
}>();

const whereNoSlots = ref<EmptySlot[]>([]);
const weekDates = ref<string[]>([]);
const slots = ref<SlotInfo[]>([]);
const weekNumber = ref(0);
const loading = ref(false);
const now = computed(() => new Date());
const schedule = ref<SingleDoctorScheduleResponse>()

const isWorkingTime: WorkingStatus[][] = new Array(7).fill(null).map(
    () => new Array(SLOTS_COUNT).fill(WorkingStatus.NOT_WORKING)
)

onMounted(async() => {
    schedule.value = (await getDoctorSchedule({id: props.id, week_num: weekNumber.value})).data
    weekDates.value = computed(() => getWeekDates(schedule.value?.schedule)).value || [];
    updateSchedule();
});

watch(weekNumber, async () => {
    loading.value = true;
    schedule.value = (await getDoctorSchedule({id: props.id, week_num: weekNumber.value})).data
    weekDates.value = computed(() => getWeekDates(schedule.value?.schedule)).value || [];
    loading.value = false;
});

const updateSchedule = async () => {
    try {
        const response = await getDoctorSchedule({ id: props.id, week_num: weekNumber.value });
        
        whereNoSlots.value = [];  
        slots.value = [];  
        
        response.schedule.forEach(day => {
            const dayAtWeek = day.dayAtWeek;
            let indexes = { start: timeToSlotIndex(day.startTime), end: timeToSlotIndex(day.endTime) };
            setWorkingStatus(day.dayAtWeek, indexes, WorkingStatus.AVAILABLE);

            indexes = { start: timeToSlotIndex(day.lunch.startTime), end: timeToSlotIndex(day.lunch.endTime) };
            setWorkingStatus(day.dayAtWeek, indexes, WorkingStatus.NOT_AVAILABLE);
            slots.value.push({ status: SlotStatus.LUNCH, dayAtWeek, indexes, toShow: null });

            for (let slot of day.slots) {
                const indexes = { start: timeToSlotIndex(slot.startTime), end: timeToSlotIndex(slot.endTime) };
                setWorkingStatus(day.dayAtWeek, indexes, WorkingStatus.NOT_AVAILABLE);

                if (slot.mine)
                    slots.value.push({ status: SlotStatus.MY_APPOINTMENT, dayAtWeek, indexes, toShow: null });
                else
                    slots.value.push({ status: SlotStatus.SOME_APPOINTMENT, dayAtWeek, indexes, toShow: null });
            }

            for (let [slotIndex, slotWorkingStatus] of isWorkingTime[dayAtWeek].entries()) {
                if (slotWorkingStatus !== WorkingStatus.NOT_AVAILABLE) {
                    whereNoSlots.value.push({ dayIndex: dayAtWeek, slotIndex, status: slotWorkingStatus });
                }
            }
        });
    } catch (error) {
        console.error("Failed to fetch schedule", error);
    }
};

const setWorkingStatus = (
    weekDayIndex: number,
    indexes: { start: number, end: number },
    status: WorkingStatus
) => {
    for (let slotIndex = indexes.start; slotIndex < indexes.end; slotIndex++) {
        isWorkingTime[weekDayIndex][slotIndex] = status;
    }
};
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
