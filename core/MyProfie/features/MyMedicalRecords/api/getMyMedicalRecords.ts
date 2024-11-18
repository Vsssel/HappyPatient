import { useApi } from "~/shared/api"
import type { GetMyMedicalRecordsRequest, GetMyMedicalRecordsResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const getMyMedicalRecords = async(params: GetMyMedicalRecordsRequest): Promise<ApiResponse<GetMyMedicalRecordsResponse>> => {
    const response = useApi<GetMyMedicalRecordsResponse>('patient/medical-records', {
        method: "GET",
        params: params,
        auth: true
    })

    return response
}