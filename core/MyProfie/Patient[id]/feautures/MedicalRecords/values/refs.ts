import { ref } from "vue"
import type { GetPatientInfoResponse, GetPatientRecordsResponse, PostPatientRecordsRequest } from "../types"
import type { FormFields } from "~/shared/components/form/types"

export const patient = ref<GetPatientInfoResponse>()
export const records = ref<GetPatientRecordsResponse>()
export const addRecord = ref<boolean>(false)
export const editRecord = ref<boolean>(false)
export const offset = ref<number>(0)
export const recordType = ref<string>('test')
export const values = ref<PostPatientRecordsRequest>({
  appointment_id: 0,
  type: 'test',
  title: '',
  content: ''
})
export const form = ref<Array<FormFields>>([
  {
    type: 'slot',
    name: 'type',
    class: 'w-100 mt-1 mb-1',
    required: true,
    label: {
      text: 'Record Type',
      class: 'text',
    },
  },
  {
    type: 'text',
    name: 'title',
    class: 'w-100 mt-1 mb-1',
    required: true,
    label: {
      text: 'Record Title',
      class: 'text',
    },
    value: values.value.title,
  },
  {
    type: 'textarea',
    name: 'content',
    class: 'w-100 mt-1 mb-1',
    required: true,
    label: {
      text: 'Record Content',
      class: 'text',
    },
    autoResize: true,
    value: values.value.content,
    rows: 5,
    cols: 50,
  },
])

