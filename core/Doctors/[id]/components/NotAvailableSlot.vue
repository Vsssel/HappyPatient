<script setup lang="ts">
    import { SlotStatus, type SlotInfo, type SlotInfoToShow } from '../types';
    import { slotHeight } from '../values';

    const { slot } = defineProps<{ slot: SlotInfo }>();
    const margin = 1;

    const slotInfo = computed(() => {
        switch (slot.status) {
            case SlotStatus.MY_APPOINTMENT:
                return { bg: '#539092', color: '#fff', title: 'mine' };
            case SlotStatus.SOME_APPOINTMENT:
                return { bg: '#8bcfcc', color: '#539092', title: 'busy' };
            default:
                return { bg: '#aee8e6', color: '#539092', title: 'lunch' }
        }
    });
</script>


<template>
    <div
        :class="`
            position-absolute p-1 rounded overflow-hidden
            d-flex align-items-center justify-content-center
            text-center fw-semibold text-break
        `"
        :style="{
            width: `calc(100% - ${2 * margin}px)`,
            height: `calc(${slotHeight(slot.indexes)}00% - ${2 * margin}px)`,
            margin: `${margin}px`,
            color: slotInfo.color,
            backgroundColor: slotInfo.bg
        }"
    >
        {{ slotInfo.title }}
    </div>
</template>


<style scoped>
    div {
        font-size: 12px;
        z-index: 2;
    }
</style>