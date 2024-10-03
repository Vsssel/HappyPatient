<script setup lang="ts">
    defineProps<{ url: string, title:string }>();
    const size = '75px';
</script>


<template>
    <div :style="{ width: size, height: size }"
        class="rounded-circle overflow-hidden"
    >
        <img :src="url" :alt="title"
            class="w-100 h-100"
        >
    </div>
</template>


<style scoped>
    img {
       object-fit: cover;
    }
</style>