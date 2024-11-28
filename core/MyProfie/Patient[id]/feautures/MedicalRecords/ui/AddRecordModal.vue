<template>
  <Dialog v-model:visible="isDialogVisible" modal header="Add Record" :style="{ width: '30rem' }">
    <FormField
      class="w-100"
      :formFields="form"
      :submit="onSubmit"
      v-model:values="values"
    >
      <template #type>
        <div class="w-100 d-flex flex-row gap-3 justify-content-center">
          <div class="d-flex flex-row gap-2" v-for="option in typeOptions" :key="option.value">
            <RadioButton v-model="values.type" :value="option.value" />
            <span class="text">{{ option.label }}</span>
          </div>
        </div>
      </template>
      <template #error="{ field }">
        <label v-if="field.name === 'content' && values.content.length > 500" class="text text-danger">
          Content should be less than 500 symbols
        </label>
      </template>
    </FormField>
  </Dialog>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import FormField from '~/shared/components/form/FormField.vue'
import RadioButton from 'primevue/radiobutton'
import { addRecord, records, offset, values, form, recordType, editRecord } from '../values'
import { getPatientRecords, putPatientRecord, postPatientRecord  } from '../api'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { updateForm } from '../utils'

const toast = useToast()
const route = useRoute()
const appointment_id = +route.params.id

const typeOptions = [
  { value: 'test', label: 'Test' },
  { value: 'anamnesis', label: 'Anamnesis' },
  { value: 'conclusion', label: 'Conclusion' },
]

const isDialogVisible = computed({
  get: () => addRecord.value || editRecord.value,
  set: (val) => {
    if (!val) {
      addRecord.value = false
      editRecord.value = false
    }
  },
})

const resetForm = () => {
  values.value = {
    appointment_id: 0,
    type: 'test',
    title: '',
    content: ''
  }
  updateForm()
}

const onSubmit = async (fieldValues: Record<string, any>) => {
  values.value.content = fieldValues.content
  if (values.value.content.length > 500) return

  try {
    const response = addRecord.value
      ? await postPatientRecord({
          appointment_id,
          type: values.value.type,
          title: fieldValues.title,
          content: fieldValues.content,
        })
      : await putPatientRecord(values.value.appointment_id, {
          title: fieldValues.title,
          type: values.value.type,
          content: fieldValues.content,
        })

    if (response.status < 400) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: response.data.detail,
        life: 4000,
      })
      addRecord.value = false
      editRecord.value = false

      records.value = (
        await getPatientRecords({
          id: appointment_id,
          record_type: recordType.value,
          offset: offset.value,
          limit: 6,
        })
      ).data
      resetForm()
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.message,
        life: 4000,
      })
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An unexpected error occurred.',
      life: 4000,
    })
  }
}
</script>
