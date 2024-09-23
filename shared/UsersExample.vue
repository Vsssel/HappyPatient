<template>
  <div>
    <h3>Data from URL 1:</h3>
    <Loader url="https://jsonplaceholder.typicode.com/todos/1" type="square" />

    <h3>Data from URL 2:</h3>
    <Loader url="https://jsonplaceholder.typicode.com/todos/2" type="line" />
  </div>
</template>

<script setup lang="ts">
import Loader from "~/shared/Loader.vue";
</script>
