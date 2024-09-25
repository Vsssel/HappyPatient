<template>
  <div>
    <div v-if="isLoading">
      <div v-if="type === 'square'">
        <Skeleton :style="sizeStyle" shape="square" />
      </div>
      <div v-else-if="type === 'line'">
        <Skeleton :style="sizeStyle" />
      </div>
      <div v-else>
        <Skeleton width="6rem" height="6rem" />
      </div>
    </div>
    <div v-else>
      <slot :data="data">
        <div>Data: {{ data }}</div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import { computed } from 'vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    default: 'default',
  },
  size: {
    type: Object,
    default: () => ({
      width: '100%',
      height: 'auto',
    }),
  },
  data: {
    type: [Object, null],
    default: null,
  },
});

const sizeStyle = computed(() => ({
  width: props.size.width || '100%',
  height: props.size.height || 'auto',
}));
</script>
