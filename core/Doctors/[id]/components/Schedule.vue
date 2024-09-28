<script setup lang="ts">
    import { SlotStatus, WorkingStatus, type EmptySlot, type GetScheduleResponse, type SlotInfo } from '../types';
    import { SLOTS_COUNT, timeToSlotIndex, slotKey, emptySlotKey } from '../values';
    import Table from './Table.vue';
    import NotAvailableSlot from './NotAvailableSlot.vue';
    import FreeSlot from './FreeSlot.vue';
    import ScheduleHeader from './ScheduleHeader.vue';
    import { getDoctorSchedule } from '../api';
    import Loader from '~/shared/components/loader/Loader.vue';
    import { getWeekDates } from '~/shared/values';

    const props = defineProps<{ id: number, week: GetScheduleResponse[] }>();
    const week = ref<GetScheduleResponse[]>([...props.week]);
    const whereNoSlots = ref<EmptySlot[]>([]);
    const slots = ref<SlotInfo[]>([]);
    const weekNumber = ref(0);
    const loading = ref(false);
    const weekDates = computed(() => getWeekDates(week.value[0].date));
    const now = computed(() => new Date());
    
    const isWorkingTime: WorkingStatus[][] = new Array(7).fill(null).map(
        () => new Array(SLOTS_COUNT).fill(WorkingStatus.NOT_WORKING)
    );

    onMounted(() => week.value.forEach(day => {
        const dayAtWeek = day.dayAtWeek;
        let indexes = { start: timeToSlotIndex(day.startTime), end: timeToSlotIndex(day.endTime) };
        setWorkingStatus(day.dayAtWeek, indexes, WorkingStatus.AVAILABLE)
        
        indexes = { start: timeToSlotIndex(day.lunch.startTime), end: timeToSlotIndex(day.lunch.endTime) };
        setWorkingStatus(day.dayAtWeek, indexes, WorkingStatus.NOT_AVAILABLE);
        slots.value.push({ status: SlotStatus.LUNCH, dayAtWeek, indexes, toShow: null });

        for (let slot of day.slots) {
            const indexes = { start: timeToSlotIndex(slot.startTime), end: timeToSlotIndex(slot.endTime) };
            setWorkingStatus(day.dayAtWeek, indexes, WorkingStatus.NOT_AVAILABLE)

            if (slot.mine && slot.type)
                slots.value.push({ status: SlotStatus.MY_APPOINTMENT, dayAtWeek, indexes, toShow: { type: slot.type } });
            else
                slots.value.push({ status: SlotStatus.SOME_APPOINTMENT, dayAtWeek, indexes, toShow: null });
        }

        for (let [slotIndex, slotWorkingStatus] of isWorkingTime[dayAtWeek].entries())
            if (slotWorkingStatus != WorkingStatus.NOT_AVAILABLE)
                    whereNoSlots.value.push({ dayIndex: dayAtWeek, slotIndex, status: slotWorkingStatus });
    }));

    watch(weekNumber, (value) => {
        loading.value = true;
        getDoctorSchedule(props.id, value)
            .then(newWeek => {
                if (!newWeek) throw new Error();
                week.value = newWeek;            
            })
            .catch(console.error)
            .finally()
        loading.value = false;
    });

    const setWorkingStatus = (
        weekDayIndex: number,
        indexes: { start: number, end: number },
        status: WorkingStatus
    ) => {
        for (let slotIndex = indexes.start; slotIndex < indexes.end; slotIndex++)
            isWorkingTime[weekDayIndex][slotIndex] = status;
    };
</script>


<template>
    <Loader :is-loading="loading">
        <div id="schedule-container" class="d-flex flex-column">
            <ScheduleHeader
                :week-number="weekNumber"
                :decrement="() => weekNumber--"
                :increment="() => weekNumber++"
            />
            
            <Table v-if="week.length > 0" :week="weekDates">
                <template v-for="slot in slots" #[slotKey(slot)]>
                    <NotAvailableSlot :slot="slot" />
                </template>
                <template v-for="emptySlot in whereNoSlots" #[emptySlotKey(emptySlot)]>
                    <FreeSlot v-if="emptySlot.status == WorkingStatus.AVAILABLE"
                        :day-index="emptySlot.dayIndex" :slot-index="emptySlot.slotIndex"
                        :date="weekDates[emptySlot.dayIndex]" :now="now"
                    />
                </template>
            </Table>
        </div>
    </Loader>
</template>


<style scoped>
    #schedule-container {
        width: min-content;
        margin: 40px auto;
        padding: 10px;
        padding-top: 7.5px;
        gap: 5px;
        border: 1px solid #ddd;
        border-radius: 20px;
    }
</style>