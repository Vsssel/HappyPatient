<template>
  <h3>Data from URL 1:</h3>
  <CustomFetch :fetchFunction="fetchFromUrl1">
    <template #loading>
      <div class="loading-custom">
        <Skeleton size="6rem" class="mr-2"></Skeleton>
      </div>
    </template>

    <template #default="{ data }">
      <div class="loaded-custom">
        <p>{{ data }}</p>
      </div>
    </template>
  </CustomFetch>

  <h3>Data from URL 2:</h3>
  <CustomFetch :fetchFunction="fetchFromUrl2">
    <template #loading>
      <div class="loading-custom">
        <Skeleton size="6rem" class="mr-2"></Skeleton>
      </div>
    </template>

    <template #default="{ data }">
      <div class="loaded-custom">
        <p>{{ data }}</p>
      </div>
    </template>
  </CustomFetch>
</template>

<script setup lang="ts">
import CustomFetch from "~/shared/CustomFetch.vue";

const fetchFromUrl1 = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return response.json();
};

const fetchFromUrl2 = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/2");
  return response.json();
};
</script>
