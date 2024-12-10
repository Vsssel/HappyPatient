<template>
  <FormField 
    :form-group="formGroup" 
    v-model:values="values" 
    :submit="onSubmit" 
    :onChange="onHandleChange"
  >
    <template #button>
      <div 
        v-if="isFuture && (me.data.value?.role === UserRoles.Manager && (appointment.patient.id === me.data.value.id))" 
        class="w-100"
      >
        <div 
          v-if="disabled" 
          class="w-100 d-flex gap-2 mt-2 justify-content-end"
        >
          <button 
            @click="deleteAppointment"
            type="button"
            class="btn btn-danger btn-sm"
          >
            Delete
          </button>
          <button 
            @click="editAppointment"
            class="btn btn-primary btn-sm"
          >
            Edit
          </button>
        </div>
        <div 
          v-else 
          class="w-100 d-flex gap-2 mt-2 justify-content-end"
        >
          <button 
            @click="async() => {disabled = true; updateValues();}"
            class="btn btn-danger btn-sm"
            type="reset"
          >
            Cancel
          </button>
          <button 
            type="submit"
            :class="['btn btn-primary btn-sm', (errorEnd && errorStart) ? 'disabled' : '' ]"
        >
            Save
          </button>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="d-flex m-2 w-100 gap-2 flex-column">
        <span>
          <i class="bi bi-geo-alt fs-5 text-secondary"/>
          {{ appointment?.room.address }}
        </span>
        <span>
          <i 
            class="bi bi-coin fs-5" 
            style="color: #FFD700;"
          />
          {{ totalPrice }}
        </span>
      </div>
    </template>
    <template #error="{ field }">
      <label 
        v-if="field.name === 'endsAt' && errorEnd && !disabled" 
        class="form-label text-danger"
      >
        {{ errorEnd }}
      </label>
      <label 
        v-if="field.name === 'startsAt' && errorStart && !disabled"
        class="form-label text-danger"
      >
        {{ errorStart }}
      </label>
    </template>
  </FormField>
</template>
<script setup lang="ts">
import { formGroup, values, disabled, isFuture, errorEnd, errorStart, appointment, totalPrice } from '../values'
import { updateValues } from '../utils'
import { defineProps } from 'vue'
import { FormField } from '~/shared/components'
import me from '~/shared/stores/User'
import { UserRoles } from '~/shared/enum'

defineProps<{
  onSubmit: (fieldValues: Record<string, any>) => Promise<void>,
  onHandleChange: (fieldValues: Record<string, any>) => Promise<void>,
  deleteAppointment: () => Promise<void>
}>();


const editAppointment = () => {
  errorEnd.value = ''
  errorStart.value = ''
  disabled.value = !disabled.value
}
</script>