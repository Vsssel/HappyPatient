<script setup lang="ts">
import { SLOTS_PER_HOUR, weekDayTitles } from '~/shared/values';
import type { HourSlotsIndexRelation, SingleDoctorScheduleResponse } from '../types';
import { onMounted, ref } from 'vue';

    const { worktime } = defineProps<{
        week: string[],
        worktime: SingleDoctorScheduleResponse['worktime']
    }>();
    const hoursSlotsRelations = ref<HourSlotsIndexRelation[]>([]);

    onMounted(() => {
        for (let hour = worktime.startHours; hour < worktime.endHours; hour++) {
            const currHourSlots: HourSlotsIndexRelation = { hour, slotIndexes: [] };
            const startIndex = SLOTS_PER_HOUR * (hour -worktime.startHours);
            for (let slotIndex = 0; slotIndex < SLOTS_PER_HOUR; slotIndex++)
                currHourSlots.slotIndexes.push(startIndex + slotIndex);
            hoursSlotsRelations.value.push(currHourSlots)
        }
    });
</script>


<template>
    <table class="user-select-none">
        <thead>
            <tr>
                <th class="text-center fw-semibold"> {{'Time'}} </th>
                <th v-for="weekDay in weekDayTitles" :key="weekDay.index" class="text-center">
                    <span class="fw-semibold">{{ weekDay.default }}</span>
                    <br>
                    <span class="add fw-normal">{{ week[weekDay.index] }}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="hourSlotsRelation in hoursSlotsRelations" :key="hourSlotsRelation.hour">
                <th class="text-center">
                    <span class="fw-semibold">{{ `${hourSlotsRelation.hour}:00` }}</span>
                    <br>
                    <span class="add fw-normal">{{ `${hourSlotsRelation.hour + 1}:00` }}</span>
                </th>
                <td v-for="weekDay in weekDayTitles" :key="weekDay.index"
                    class="position-relative p-0"
                >
                    <div v-for="slotIndex in hourSlotsRelation.slotIndexes" :key="slotIndex"
                        class="min-slot" :style="{ height: `${50/SLOTS_PER_HOUR}px` }"
                    >
                        <slot :name="`${weekDay.index}-${slotIndex}`"></slot>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped>
    table {
        position: relative;
        background-color: #F7F7FF;
    }

    th, td {
        border: 1px solid #ddd;
    }

    th {
        padding: 2px 5px;
        font-size: 11px;
    }
    th span.add {
        font-size: 10px;
    }

    div.min-slot {
        position: relative;
        width: 80px;
    }
</style>
