<template>
  <div>
    <div v-if="isLoading">
      <div v-if="type === 'square'">
        <Skeleton shape="square" width="100px" height="100px" />
      </div>
      <div v-else-if="type === 'line'">
        <Skeleton width="100%" height="2rem" />
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
import { ref, onMounted } from 'vue';
import Skeleton from 'primevue/skeleton';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'default',
  },
});

const isLoading = ref(true);
const data = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(props.url);
    data.value = await response.json();
  } finally {
    isLoading.value = false;
  }
});
</script>
