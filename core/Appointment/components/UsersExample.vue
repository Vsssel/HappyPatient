<template>
  <div>
    <h3>Data from URL 1:</h3>
    <Loader :isLoading="isLoadingUrl1" :size="{ width: '500px', height: '500px' }" type="square" :data="dataUrl1">
      <div>Data: {{ dataUrl1 }}</div>
    </Loader>

    <h3>Data from URL 2:</h3>
    <Loader :isLoading="isLoadingUrl2" :size="{ width: '100%', height: '5rem' }" type="line" :data="dataUrl2">
      <div>Data: {{ dataUrl2 }}</div>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import Loader from "~/shared/components/loader/Loader.vue";
import { ref, onMounted } from 'vue'
import { useApi } from '~/shared/api';

const isLoadingUrl1 = ref(true);
const isLoadingUrl2 = ref(true);
const dataUrl1 = ref(null);
const dataUrl2 = ref(null);

const fetchFromUrl = async (url: string, dataRef: Ref<any>, loadingRef: Ref<boolean>) => {
  try {
    const response = await useApi<any>(url, {
      methos: "GET",
      auth: false,
      params: {userId: 1}
    });
    dataRef.value = response
  } finally {
    loadingRef.value = false;
  }
};

onMounted(() => {
  fetchFromUrl("/todos", dataUrl1, isLoadingUrl1);
  fetchFromUrl("/todos", dataUrl2, isLoadingUrl2);
});
</script>
