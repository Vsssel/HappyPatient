<template>
  <i v-if="!name && !surname" class="bi bi-person-circle fs-3" />
  <div v-else :class="['d-flex align-items-center justify-content-center text-center p-1 rounded-circle', isActive('/myprofile') ? 'bg-primary' : 'bg-secondary']" :style="[props.width ? `width: ${props.width}px` : 'width: 35px;', props.height ? `height: ${props.height}px` : 'height: 35px;']">
    <span :style="`font-size: ${props.fontSize ? props.fontSize : '15'}px;`" class="text-white">{{ initials }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps<{
  width?: string, 
  height?: string,
  fontSize?: string, 
  name: string | undefined, 
  surname: string | undefined
}>()
const initials = ref<string | undefined>(undefined)
const route = useRoute()

const isActive = (path: string): boolean => {
  return route.fullPath.includes(path)
}

initials.value = (props.name && props.surname) && props.name?.slice(0, 1).toUpperCase() + props.surname?.slice(0, 1).toUpperCase()

watch(props, () => {
  initials.value = (props.name && props.surname) && props.name?.slice(0, 1).toUpperCase() + props.surname?.slice(0, 1).toUpperCase()
})

</script>