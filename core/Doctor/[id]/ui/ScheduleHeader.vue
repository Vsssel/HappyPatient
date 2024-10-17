<template>
    <div class="d-flex align-self-right justify-content-between align-items-center">
        <RoundButton 
          @click="decrement" 
          :disabled="weekNumber <= 0"
          class="pi pi-chevron-left" style="color: #888;"
        />
        {{ weekNumber }}
        <RoundButton 
          @click="increment" 
          :disabled="weekNumber >= MAX_WEEKS_AHEAD"
          class="pi pi-chevron-right" 
          style="color: #888;"
        />
    </div>
</template>
<script setup lang="ts">
import RoundButton from '~/shared/components/button/RoundButton.vue'


const props = defineProps<{ weekNumber: number, decrement: () => void, increment: () => void }>();
</script>
<style scoped>
div {
    width: 100px;
}
</style>