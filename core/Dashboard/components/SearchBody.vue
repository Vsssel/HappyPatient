<script setup lang="ts">
    import type { SearchResponseElement } from '../types';
    import SearchElement from './SearchElement.vue';

    defineProps<{ doctors: SearchResponseElement[] }>();
</script>


<template>
    <div class="d-flex flex-wrap gap-2">
        <SearchElement :doctor="doctor"
            v-for="doctor in doctors" :key="doctor.id"
        />
    </div>
</template>