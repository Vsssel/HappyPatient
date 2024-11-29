<template>
  <div class="card appointment-card p-2 ps-3 border-2 gap-3 d-flex">
    <div class="d-flex flex-row align-items-center justify-content-between">
      <div class="d-flex gap-1 flex-column">
        <span class="text">
          <span class="fw-bold">
            {{ capitalizeFirstLetter(record.type) }}
          </span> 
          by {{ record.doctor.name }} {{ record.doctor.surname }}
        </span>
        <span class="text">
            {{ record.addedTime }}
        </span>
      </div>
    </div>
    <div class="d-flex flex-row">
      <span class="text w-100">
        {{ more === false ? `${record.content.length > 200 ? `${record.content.slice(0, 200)}...` : record.content}` : record.content }}
        <span 
          v-if="record.content.length > 200" 
          class="text-primary" 
          style="cursor: pointer;" 
          @click="more = !more"
        >
          {{ more === false ? 'more' : 'less' }}
        </span>
      </span>
    </div>
    <div v-if="record.doctor.id === me.data.value?.id" class="w-100 d-flex flex-row gap-2 justify-content-end justify-self-end">
      <button class="btn btn-sm ps-2 pe-2 btn-danger" @click="deleteRecord(record.id)">
        Delete
      </button>
      <button class="btn btn-sm ps-2 pe-2 btn-primary" @click="openModal(record)">
        Edit
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import type { GetPatientRecordsResponse } from '../types'
import { capitalizeFirstLetter } from '~/shared/utils'
import me from '~/shared/stores/User'
import { addRecord, editRecord, offset, records, recordType, values } from '../values'
import { useToast } from 'primevue/usetoast'
import { deletePatientRecord, getPatientRecords } from '../api'
import { useConfirm } from 'primevue/useconfirm'
import { useRoute } from 'vue-router'
import { updateForm } from '../utils'

const props = defineProps<{
  record: GetPatientRecordsResponse['page'][0]
}>()

const more = ref<boolean>(false)
const toast = useToast()
const confirm = useConfirm()
const route = useRoute()
const id = +route.params.id

const deleteRecord = async(recordId: number) => {
  confirm.require({
    message: 'Are you sure you want to delete this record?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'No',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Yes',
      severity: 'info'
    },
    accept: async() => {
      const response = await deletePatientRecord(recordId)
      if (response.status < 400){
        toast.add({severity: 'success', summary: 'Success', detail: response.data.detail, life: 4000})
        records.value = (await getPatientRecords({id: id, record_type: recordType.value, offset: offset.value, limit: 6 })).data
      }else {
        toast.add({severity: 'success', summary: 'Error', detail: response.data.detail, life: 4000})
      }
    },
    reject: () => {}
  })
}

const openModal = (record: GetPatientRecordsResponse['page'][0]) => {
  editRecord.value = true
  values.value = {
    appointment_id: record.id,
    type: record.type,
    title: record.title,
    content: record.content
  }
  updateForm()
}
</script>