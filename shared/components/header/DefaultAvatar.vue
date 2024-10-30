<template>
    <i v-if="!initials" class="bi bi-person-circle fs-3" />
    <div v-else class="bg-primary d-flex align-items-center justify-content-center text-center p-1 rounded-circle" :style="[props.width ? `width: ${props.width}px` : 'width: 35px;', props.height ? `height: ${props.height}px` : 'height: 35px;']">
        <span :style="`font-size: ${props.fontSize ? props.fontSize : '15'}px;`" class="text-white">{{ initials }}</span>
    </div>
</template>
<script setup lang="ts">
import me from '~/shared/stores/User'
import { ref, onMounted } from 'vue'

const props = defineProps<{width?: string, height?: string, fontSize?: string}>()
const initials = ref<string | null>(null)

onMounted(() => {
    if(me.data.value){
        initials.value = me.data.value.name.slice(0, 1).toUpperCase() + me.data.value.surname.slice(0, 1).toUpperCase()
    }
})
</script>