<script setup lang="ts">
    import RoundButton from '~/shared/components/button/RoundButton.vue';

    const props = defineProps<{ weekNumber: number, decrement: () => void, increment: () => void }>();
</script>


<template>
    <div class="d-flex align-self-right justify-content-between align-items-center">
        <RoundButton @click="decrement" :disabled="weekNumber <= 0">
            <i class="pi pi-chevron-left" style="color: #888;"></i>
        </RoundButton>
        {{ weekNumber }}
        <RoundButton @click="increment" :disabled="weekNumber >= 3">
            <i class="pi pi-chevron-right" style="color: #888;"></i>
        </RoundButton>
    </div>
</template>


<style scoped>
    div {
        width: 100px;
    }
</style>