<template>
  <div>
    <NuxtLink to="/appointment">Appointment</NuxtLink>
    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
    <Users />
  </div>
</template>

<script setup lang="ts">
  import Users from '~/shared/UsersExample.vue';
</script>