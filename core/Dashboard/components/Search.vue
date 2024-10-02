<script setup lang="ts">
    import type { SearchResponseElement } from '../types';
    import SearchBody from './SearchBody.vue';
    import response from './mock-response';

    const searchData = ref<SearchResponseElement[]>(response);
</script>


<template>
    <main class="d-flex flex-column gap-1 p-2">
        
        <SearchBody :doctors="searchData" />
    </main>
</template>


<style scoped>
    main {
        border: 1px solid #ddd;
        border-radius: 17px;
    }
    
</style>