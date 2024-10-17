<script setup lang="ts">
    import { hoursSlotsRelation } from '../values/index';
    import { SLOTS_PER_HOUR, weekDayTitles } from '~/shared/values/index';

    const { week } = defineProps<{ week: string[] }>();
</script>


<template>
    <div class="card">
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
            </tbody>
        </table>
    </div>
</template>
<style scoped>
    table {
        position: relative;
        background-color: white;
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
