import { ref } from "vue"
import type { GetPatientInfoResponse, GetPatientRecordsResponse } from "../types"

export const patient = ref<GetPatientInfoResponse>()
export const records = ref<GetPatientRecordsResponse>()