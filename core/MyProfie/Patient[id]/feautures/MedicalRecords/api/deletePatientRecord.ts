import { useApi } from "~/shared/api"
import type { ApiResponse } from "~/shared/api/type"
import type { DeletePatientRecordsRequest, DeletePatientRecordsResponse } from "../feautures/MedicalRecords/types"

export const deletePatientRecord = async(id: number): Promise<ApiResponse<DeletePatientRecordsResponse>> => {
  const reponse = await useApi<DeletePatientRecordsResponse>(`doctor/medical-records/${id}`, {
    method: 'DELETE',
    auth: true
  })

  return reponse
}