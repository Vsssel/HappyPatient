<template>
    <div id="schedule-container" class="d-flex flex-column">
      <div class="d-flex col-12 gap-2 align-self-right align-items-center text">
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
        <span class="text-danger">You can make appointment only for upcoming 3 weeks</span>
      </div>
      <Skeleton v-if="loading" style="width: 100%; height: 650px"></Skeleton>
      <Table v-if="schedule && schedule.length > 0 && !loading" :week="weekDates" :worktime="worktime">
        <template v-for="slot in slots" #[slotKey(slot)] >
          <NotAvailableSlot :slot="slot" />
        </template>
        <template v-for="emptySlot in whereNoSlots" #[emptySlotKey(emptySlot)] >
          <FreeSlot v-if="emptySlot.status == WorkingStatus.AVAILABLE"
            :day-index="emptySlot.dayIndex" :slot-index="emptySlot.slotIndex"
            :date="weekDates[emptySlot.dayIndex]" :now="now"
            :worktime="worktime"
          />
        </template>
      </Table>
      <div v-if="me.data.value?.role === UserRoles.Manager && me.data.value?.buildingId === doctor?.office.building_id" class="d-flex flex-wrap w-100 justify-content-center p-2 flex-row gap-2">
        <div class="d-flex flex-row gap-2 align-items-center">
          <div class="btn btn-sm btn-primary fw-medium" style="font-size: 10px;">mine</div>
          <span style="font-size: 10px;">- Your appointment</span>
        </div>
        <div class="d-flex flex-row gap-2 align-items-center">
          <div class="btn d-flex align-items-center justify-content-center p-1 text text-white fw-medium" style="background-color: #9fd3c7; font-size: 10px;">N. Surname</div>
          <span style="font-size: 10px;">- Booked appointments</span>
        </div>
        <div class="d-flex flex-row gap-2 align-items-center">
          <div class="btn d-flex align-items-center justify-content-center p-1 text text-white fw-medium" style="background-color: #385170; font-size: 10px;">N. Surname</div>
          <span style="font-size: 10px;">- Confirmed appointments</span>
        </div>
        <div class="d-flex flex-row gap-2 align-items-center">
          <div class="btn d-flex align-items-center justify-content-center p-1 text text-white fw-medium" style="background-color: #F1948A; font-size: 10px;">N. Surname</div>
          <span style="font-size: 10px;">- Missed appointments</span>
        </div>
        <div class="d-flex flex-row gap-2 align-items-center">
          <div class="btn d-flex align-items-center justify-content-center p-1 btn-warning text fw-medium"><i class="bi bi-ban" style="font-size: 10px;" /></div>
          <span style="font-size: 10px;">- You have another appointment at this time</span>
        </div>
      </div>
      <div v-else class="d-flex flex-wrap w-100 justify-content-center flex-row gap-2">
        <div class="d-flex flex-row gap-2 align-items-center">
          <div class="btn btn-sm btn-primary fw-medium" style="font-size: 10px;">mine</div>
          <span style="font-size: 10px;">- Your appointment</span>
        </div>
        <div class="d-flex flex-row gap-2 align-items-center">
          <div class="btn d-flex align-items-center justify-content-center p-1 btn-secondary text fw-medium"><i class="bi bi-ban" style="font-size: 10px;" /></div>
          <span style="font-size: 10px;">- Taken appointments</span>
        </div>
        <div class="d-flex flex-row gap-2 align-items-center">
          <div class="btn d-flex align-items-center justify-content-center p-1 btn-warning text fw-medium"><i class="bi bi-ban" style="font-size: 10px;" /></div>
          <span style="font-size: 10px;">- You have another appointment at this time</span>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { WorkingStatus } from '../types';
import { slotKey, emptySlotKey, weekNumber, schedule, worktime, weekDates, whereNoSlots, slots, doctor } from '../values';
import Table from '~/shared/components/Table/Table.vue';
import NotAvailableSlot from './NotAvailableSlot.vue';
import FreeSlot from './FreeSlot.vue';
import RoundButton from '~/shared/components/button/RoundButton.vue'
import { MAX_WEEKS_AHEAD } from '~/shared/values'
import { updateSchedule } from '../utils'
import me from '~/shared/stores/User';
import { UserRoles } from '~/shared/enum';
import Skeleton from 'primevue/skeleton';

const loading = ref(false);
const now = computed(() => new Date());


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
