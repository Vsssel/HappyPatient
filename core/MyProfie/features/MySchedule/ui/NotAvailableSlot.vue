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
        slot.status === SlotStatus.SOME_APPOINTMENT ? 'cursor: pointer' : ''
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

const { slot } = defineProps<{ slot: SlotInfo }>()
const router = useRouter()
const margin = 1

const openAppointment = () => {
  slot.status === SlotStatus.SOME_APPOINTMENT && router.push(`/myprofile/patient${slot.id}`)
}

const slotInfo = computed(() => {
  switch (slot.status) {
    case SlotStatus.SOME_APPOINTMENT:
        return { bg: '#AAAAAA', color: '#FFFFFF', title:`${slot.patient?.name.slice(0, 1)}. ${slot.patient?.surname}` };
    default:
        return { bg: '#AAAAAA', color: '#FFFFFF', title: 'Lunch time' }
  }
});
</script>
<style scoped>
div {
    font-size: 12px;
    z-index: 2;
}
</style>