<template>
  <table>
    <thead>
      <tr>
        <th class="text-center fw-semibold add"> {{'Time'}}</th>
        <th v-for="weekDay in weekDayTitles" :key="weekDay.index" class="text-center">
          <span class="fw-semibold add">{{ weekDay.default }}</span>
          <br>
          <span class="add fw-normal">{{ week[weekDay.index] }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="hourSlotsRelation in hoursSlotsRelations" :key="hourSlotsRelation.hour">
        <th class="text-center">
          <span class="add fw-semibold">{{ `${hourSlotsRelation.hour}:00` }}</span>
          <br>
          <span class="add fw-normal">{{ `${hourSlotsRelation.hour + 1}:00` }}</span>
        </th>
        <td v-for="weekDay in weekDayTitles" :key="weekDay.index"
          class="position-relative p-0"
        >
          <div 
            v-for="slotIndex in hourSlotsRelation.slotIndexes" 
            :key="slotIndex"
            class="min-slot"
            :style="{ height: `${50/SLOTS_PER_HOUR}px`}"
          >
            <slot :class="currentTime(week[weekDay.index], `${hourSlotsRelation.hour}:00:00`, `${hourSlotsRelation.hour + 1}:00:00`)" :name="`${weekDay.index}-${slotIndex}`" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { SLOTS_PER_HOUR, weekDayTitles } from '~/shared/values';
import { onMounted, ref } from 'vue';

const { worktime } = defineProps<{
    week: string[],
    worktime: any
}>();
const hoursSlotsRelations = ref<any>([]);

onMounted(() => {
  for (let hour = worktime.startHours; hour < worktime.endHours; hour++) {
    const currHourSlots: any = { hour, slotIndexes: [] };
    const startIndex = SLOTS_PER_HOUR * (hour -worktime.startHours);
    for (let slotIndex = 0; slotIndex < SLOTS_PER_HOUR; slotIndex++)
      currHourSlots.slotIndexes.push(startIndex + slotIndex);
    hoursSlotsRelations.value.push(currHourSlots)
  }
});

const currentTime = (date: string, startTime: string, endTime: string): boolean => {
  const now = new Date();
  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  return now >= startDateTime && now <= endDateTime;
};
</script>
<style scoped>
table {
  position: relative;
}

th, td {
  border: 1px solid #ddd;
}

div.min-slot {
  position: relative;
  width: 100%;
}
</style>
