<template>
    <div v-if="isLoading" class="w-100">
      <Skeleton v-if="type === 'square'" :style="sizeStyle" shape="square" />
      <Skeleton v-else-if="type === 'line'" :style="sizeStyle" />
      <Skeleton v-else width="6rem" height="6rem" />
    </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import { computed } from 'vue';

const { type, size } = defineProps<{
  isLoading: boolean,
  type?: string,
  size?: Record<string, string>
}>();

const sizeStyle = computed(() => ({ width: '100%', height: 'auto', ...size }));
</script>
