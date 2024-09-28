<script setup lang="ts">
    const { disabled } = defineProps({ disabled: { type: Boolean, required: false } });
</script>


<template>
    <button class="d-flex justify-content-center align-items-center border-0 p-2" :disabled="disabled">
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

    button:disabled {
        background-color: #eee;
    }
</style>