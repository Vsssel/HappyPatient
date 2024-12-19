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
        `backgroundColor: ${slotInfo.bg}`,
        slot.status === (SlotStatus.BOOKED || SlotStatus.CONFIRMED || SlotStatus.MISSED) ? 'cursor: pointer' : ''
    ]"
  >
    <span class="table-text text-white">{{ slotInfo.title }}</span>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { SlotStatus, type SlotInfo } from '../types'
import { slotHeight } from '../values'
import { useRouter } from 'vue-router'
import { addBreadcrumb } from '~/shared/stores';

const { slot } = defineProps<{ slot: SlotInfo }>()
const router = useRouter()
const margin = 1

const openAppointment = () => {
  addBreadcrumb({name: `Appointment ${slot.id}`, path: `/myprofile/patient${slot.id}`})
  slot.status === (SlotStatus.BOOKED || SlotStatus.CONFIRMED || SlotStatus.MISSED) && router.push(`/myprofile/patient${slot.id}`)
}

const slotInfo = computed(() => {
  switch (slot.status) {
    case SlotStatus.BOOKED:
      return { bg: '#9fd3c7', color: '#FFFFFF', title: `${slot.patient?.name.slice(0, 1)}. ${slot.patient?.surname}` }
    case SlotStatus.CONFIRMED:
      return { bg: '#385170', color: '#FFFFFF', title: `${slot.patient?.name.slice(0, 1)}. ${slot.patient?.surname}` };
    case SlotStatus.MISSED:
      return { bg: '#F1948A', color: '#FFFFFF', title: `${slot.patient?.name.slice(0, 1)}. ${slot.patient?.surname}` }
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