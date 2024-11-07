<template>
    <div class="w-100">
        <div class="w-100 d-flex gap-2">
            <div class="card w-50 p-1 d-flex gap-2 flex-row align-items-center">
                <img 
                  :src="props.avatarURL" 
                  :alt="'Doctor image'" 
                  style="width: 40px; height: 40px; object-fit: cover;" 
                  class="rounded-circle"
                />
                <div class="d-flex flex-column">
                    <span class="fw-medium" style="font-size: 15px;">{{ props.name }} {{ props.surname }}</span>
                    <span  style="font-size: 12px;" class="text-secondary">{{ category }}</span>
                </div>
            </div>
            <div class="card w-50 p-1 gap-2 d-flex flex-row align-items-center ps-2">
                <DefaultAvatar :width="'40'" :height="'40'"/>
                <div class="d-flex flex-column">
                    <span class="fw-medium" style="font-size: 15px;">{{ me.data.value?.name }} {{ me.data.value?.surname }}</span>
                    <span style="font-size: 12px;" class="text-secondary">Patient</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import me from '~/shared/stores/User'
import DefaultAvatar from '../header/DefaultAvatar.vue'

const props = defineProps<{
    name: string;
    surname: string;
    category: string;
    avatarURL: string
}>()
</script>
