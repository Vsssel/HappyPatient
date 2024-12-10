<template>
  <div
    @click="openAppointment"
    :class="`
      position-absolute p-md-1 p-0 rounded overflow-hidden
      d-flex align-items-center justify-content-center
      text-center fw-medium text-break table-text
    `"
    :style="[
      `width: calc(100% - ${2 * margin}px)`,
      `height: calc(${slotHeight(slot.indexes)}00% - ${2 * margin}px)`,
      `margin: ${margin}px`,
      `color: ${slotInfo.color}`,
      `background-color: ${slotInfo.bg}`,
      slot.status === SlotStatus.MY_APPOINTMENT || 
      slot.status === ManagerSlotStatus.BOOKED || 
      slot.status === ManagerSlotStatus.CONFIRMED || 
      slot.status === ManagerSlotStatus.MISSED ? 
      'cursor: pointer' : ''
    ]"
  >
    <i :class="[`${slotInfo.icon} fw-bolder table-text`]"/>
    <span class="table-text text-white">{{ slotInfo.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ManagerSlotStatus, SlotStatus, type SlotInfo } from '../types';
import { slotHeight } from '../values';
import { useRouter } from 'vue-router';

const { slot } = defineProps<{ slot: SlotInfo }>();
const router = useRouter();
const margin = 1;

const openAppointment = () => {
  if (
    slot.status === SlotStatus.MY_APPOINTMENT ||
    slot.status === ManagerSlotStatus.BOOKED ||
    slot.status === ManagerSlotStatus.CONFIRMED ||
    slot.status === ManagerSlotStatus.MISSED
  ) {
    router.push(`/myprofile/${slot.id}`);
  }
};

const slotInfo = computed(() => {
  switch (slot.status) {
    case SlotStatus.MY_APPOINTMENT:
      return { bg: '#0D6EFD', color: '#FFFFFF', title: 'mine' }
    case SlotStatus.SOME_APPOINTMENT:
      return { bg: '#AAAAAA', color: '#FFFFFF', title: null, icon: 'bi bi-ban' }; // Yellow
    case ManagerSlotStatus.BOOKED:
      return { bg: '#9fd3c7', color: '#FFFFFF', title: `${slot.patient?.name.slice(0, 1)}. ${slot.patient?.surname}` }; // Light Purple
    case ManagerSlotStatus.CONFIRMED:
      return { bg: '#385170', color: '#FFFFFF', title: `${slot.patient?.name.slice(0, 1)}. ${slot.patient?.surname}` }; // Green
    case ManagerSlotStatus.MISSED:
      return { bg: '#F1948A', color: '#FFFFFF', title: `${slot.patient?.name.slice(0, 1)}. ${slot.patient?.surname}` }; // Light Red
    default:
      return { bg: '#AAAAAA', color: '#000000', title: 'Lunch time' }; // Light Gray
  }
});
</script>

<style scoped>
div {
  font-size: 12px;
  z-index: 2;
}
</style>
