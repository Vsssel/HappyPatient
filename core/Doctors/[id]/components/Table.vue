<script setup lang="ts">
    import { hoursSlotsRelation } from '../values/index';
    import { getWeekDates, SLOTS_PER_HOUR, weekDayTitles } from '~/shared/values/index';

    const { weekDayDate } = defineProps<{ weekDayDate: string }>();
    const weekDates = ref(getWeekDates(weekDayDate));
</script>


<template>
    <table class="user-select-none">
        <tr>
            <th class="text-center fw-semibold">Time</th>
            <th v-for="weekDay in weekDayTitles" :key="weekDay.index" class="text-center">
                <span class="fw-semibold">{{ weekDay.default }}</span>
                <br>
                <span class="add fw-normal">{{ weekDates[weekDay.index] }}</span>
            </th>
        </tr>
        <tr v-for="hourSlotsRelation in hoursSlotsRelation" :key="hourSlotsRelation.hour">
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
    </table>
</template>


<style scoped>
    table {
        border-collapse: collapse;
        background-color: #ebf0f6;
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