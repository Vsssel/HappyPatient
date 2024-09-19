<template>
  <div>
    <slot name="loading" v-if="isLoading">
      <div>
        <h5 class="mt-4">Loading...</h5>
        <Skeleton size="2rem" class="mr-2"></Skeleton>
        <Skeleton size="3rem" class="mr-2"></Skeleton>
        <Skeleton size="4rem" class="mr-2"></Skeleton>
        <Skeleton size="5rem"></Skeleton>
      </div>
    </slot>
    <slot v-else :data="data">
      <div>Data: {{ data }}</div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "~/composables/useFetch";

const props = defineProps({
  fetchFunction: {
    type: Function as PropType<() => Promise<any>>,
    required: true,
  },
});

const { isLoading, data, executeFetch } = useFetch(props.fetchFunction);

onMounted(executeFetch);
</script>
