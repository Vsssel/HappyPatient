<template>
    <div class="d-flex">
        <button
            class="bg-white border-secondary text-dark rounded pt-1"
            @click="onThemeToggler">
            <i :class="`pi ${iconClass}`" />
        </button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'

const iconClass = ref<'pi-moon' | 'pi-sun'>('pi-moon')
const currentTheme = ref<string>('light')

const onThemeToggler = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    iconClass.value = currentTheme.value === 'light' ? 'pi-moon' : 'pi-sun'
    localStorage.setItem('theme', currentTheme.value)
    document.documentElement.setAttribute('data-theme', currentTheme.value)
}

onMounted(() => {
    currentTheme.value = localStorage.getItem('theme') || 'light'
    iconClass.value = currentTheme.value === 'light' ? 'pi-moon' : 'pi-sun'
    document.documentElement.setAttribute('data-theme', currentTheme.value)
})
</script>