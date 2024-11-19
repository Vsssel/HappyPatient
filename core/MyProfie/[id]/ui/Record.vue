<template>
    <div class="d-flex p-2 w-100  flex-column align-items-center">
        <h5 class="p-1">New Records in Medical Records</h5>
        <div v-for="record in appointment.medicalRecords" class="border w-100 border-2 rounded p-2 d-flex flex-column gap-2">
            <div class="d-flex flex-row align-items-center justify-content-between">
                <div class="d-flex flex-column gap-1">
                    <span class="text fw-bold">{{ capitalizeFirstLetter(record.type) }}</span>
                    <span class="text">{{ record.addedTime }}</span>
                </div>
                <div>
                    <button class="btn btn-sm" style="background-color: #FEE2E2; color: #7F1D1D;">
                        <i class="bi bi-emoji-angry text" />
                        Report
                    </button>
                </div>
            </div>
            <div>
                <span class="text">
                    {{ record.content }}
                </span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { capitalizeFirstLetter } from '~/shared/utils';
import { appointment } from '../values';
</script>