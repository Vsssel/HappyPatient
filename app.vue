<script setup lang="ts">
    import me from './shared/stores/User';

    onMounted(() => me.sync());
</script>


<template>
    <NuxtPage></NuxtPage>
</template>

<style>
    /* :root {
        --p-primary-50: var(--p-blue-50);
        --p-primary-100: var(--p-blue-100);
        --p-primary-200: var(--p-blue-200);
        --p-primary-300: var(--p-blue-300);
        --p-primary-400: var(--p-blue-400);
        --p-primary-500: var(--p-blue-500);
        --p-primary-600: var(--p-blue-600);
        --p-primary-700: var(--p-blue-700);
        --p-primary-800: var(--p-blue-800);
        --p-primary-900: var(--p-blue-900);
        --p-primary-950: var(--p-blue-950);
    } */

    body {
        position: relative;
    }
</style>
