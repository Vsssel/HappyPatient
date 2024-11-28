import type { ApiResponse } from "~/shared/api/type"
import type { PostPatientRecordsRequest, PostPatientRecordsResponse } from "../feautures/MedicalRecords/types"
import { useApi } from "~/shared/api"

export const postPatientRecord = async(body: PostPatientRecordsRequest): Promise<ApiResponse<PostPatientRecordsResponse>> => {
    const response = await useApi<PostPatientRecordsResponse>('doctor/medical-records', {
        method: 'POST',
        body: body,
        auth: true
    })
    
    return response
}