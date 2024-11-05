<template>
    <div class="w-100">
        <table class="table table-striped">
            <div class="w-100 d-flex gap-2">
                <div class="card w-50 d-flex flex-row align-items-center">
                    <img :src="props.avatarURL" 
                         :alt="'Doctor image'" 
                         style="width: 55px; height: 55px; object-fit: cover;" 
                         class="rounded-circle"/>
                    <div class="d-flex flex-column">
                        <span class="fw-medium" style="font-size: 15px;">{{ props.name }} {{ props.surname }}</span>
                        <span  style="font-size: 12px;" class="text-secondary">{{ category }}</span>
                    </div>
                </div>
                <div class="card w-50 d-flex flex-row align-items-center ps-2">
                    <DefaultAvatar />
                    <div class="d-flex flex-column">
                        <span class="fw-medium" style="font-size: 15px;">{{ me.data.value?.name }} {{ me.data.value?.surname }}</span>
                        <span style="font-size: 12px;" class="text-secondary">Patient</span>
                    </div>
                </div>
            </div>
        </table>
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
