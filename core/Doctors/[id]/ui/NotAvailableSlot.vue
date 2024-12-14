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
      me.data.value?.buildingId === doctor?.office.building_id ? 
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
import { doctor } from '../values';
import me from '~/shared/stores/User';
import { UserRoles } from '~/shared/enum';

const { slot } = defineProps<{ slot: SlotInfo }>();
const router = useRouter();
const margin = 1;

const openAppointment = () => {
  if (
    slot.status === SlotStatus.MY_APPOINTMENT ||
    me.data.value?.buildingId === doctor?.value?.office.building_id || 
    me.data.value?.role === UserRoles.Manager
  ) {
    router.push(`/myprofile/${slot.id}`);
  }
};

const slotInfo = computed(() => {
  switch (slot.status) {
    case SlotStatus.MY_APPOINTMENT:
      return { bg: '#0D6EFD', color: '#FFFFFF', title: 'mine' }
    case SlotStatus.SOME_APPOINTMENT:
    case ManagerSlotStatus.BOOKED:
      if (slot.patient) {
        return { bg: '#9fd3c7', color: '#FFFFFF', title: `${slot.patient?.name.slice(0, 1)}. ${slot.patient?.surname}` }
      }
      return { bg: '#AAAAAA', color: '#FFFFFF', title: null, icon: 'bi bi-ban' };
    case ManagerSlotStatus.CONFIRMED:
      if (slot.patient) {
        return { bg: '#385170', color: '#FFFFFF', title: `${slot.patient?.name.slice(0, 1)}. ${slot.patient?.surname}` };
      }
      return { bg: '#AAAAAA', color: '#FFFFFF', title: null, icon: 'bi bi-ban' };
    case ManagerSlotStatus.MISSED:
      if (slot.patient) {
        return { bg: '#F1948A', color: '#FFFFFF', title: `${slot.patient?.name.slice(0, 1)}. ${slot.patient?.surname}` }
      }
      return { bg: '#AAAAAA', color: '#FFFFFF', title: null, icon: 'bi bi-ban' };
    default:
      return { bg: '#AAAAAA', color: '#000000', title: 'Lunch time' }
  }
});
</script>

<style scoped>
div {
  font-size: 12px;
  z-index: 2;
}
</style>
