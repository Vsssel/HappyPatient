import { useApi } from "~/shared/api"
import type { ApiResponse } from "~/shared/api/type"
import type { PutPatientRecordsRequest, PutPatientRecordsResponse } from "../feautures/MedicalRecords/types"

export const putPatientRecord = async(id: number, body: PutPatientRecordsRequest): Promise<ApiResponse<PutPatientRecordsResponse>> => {
  const response = await useApi<PutPatientRecordsResponse>(`doctor/medical-records/${id}`, {
    method: 'PUT',
    body: body,
    auth: true
  })

  return response
}