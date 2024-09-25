<script setup lang="ts">
    import { SlotStatus, WorkingStatus, type EmptySlot, type GetSubResponseWorkTime, type SlotInfo } from '../types';
    import { SLOTS_COUNT, timeToSlotIndex, slotKey, emptySlotKey } from '../values';
    import Table from './Table.vue';
    import NotAvailableSlot from './NotAvailableSlot.vue';
    import FreeSlot from './FreeSlot.vue';

    const { week } = defineProps<{ week: GetSubResponseWorkTime[] }>()

    const loading = ref(false);
    const whereNoSlots = ref<EmptySlot[]>([]);
    const slots = ref<SlotInfo[]>([]);
    
    const isWorkingTime: WorkingStatus[][] = new Array(7).fill(null).map(
        () => new Array(SLOTS_COUNT).fill(WorkingStatus.NOT_WORKING)
    );

    onMounted(() => {
        loading.value = true;

        for (let day of week) {
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
        }

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
    <Table v-if="week.length > 0" :week-day-date="week[0].date">
        <template v-for="slot in slots" #[slotKey(slot)]>
            <NotAvailableSlot :slot="slot" />
        </template>
        <template v-for="emptySlot in whereNoSlots" #[emptySlotKey(emptySlot)]>
            <FreeSlot v-if="emptySlot.status == WorkingStatus.AVAILABLE"
                :day-index="emptySlot.dayIndex" :slot-index="emptySlot.slotIndex"
            />
        </template>
    </Table>
</template>