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
        <i :class="[`${slotInfo.icon} fw-bolder`]"/>
        {{ slotInfo.title }}
    </div>
</template>
<script setup lang="ts">
    import { SlotStatus, type SlotInfo } from '../types';
    import { slotHeight } from '../values';

    const { slot } = defineProps<{ slot: SlotInfo }>();
    const margin = 1;

    const slotInfo = computed(() => {
        switch (slot.status) {
            case SlotStatus.MY_APPOINTMENT:
                return { bg: '#0D6EFD', color: '#fff', title: 'mine' };
            case SlotStatus.SOME_APPOINTMENT:
                return { bg: '#AAAAAA', color: '#FFFFFF', title: null, icon: 'bi bi-ban' };
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