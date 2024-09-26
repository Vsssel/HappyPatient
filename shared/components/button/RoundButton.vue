<script setup lang="ts">
</script>


<template>
    <button class="d-flex justify-content-center align-items-center border-0 p-1">
        <slot></slot>
    </button>
</template>


<style scoped>
    button {
        height: min-content;
        border-radius: 50%;
        background-color: transparent;
        transition: 0.3s ease-out;
    }
    button:hover {
        background-color: #eee;
    }
    button:active {
        background-color: #e3e3e3;
    }
</style>