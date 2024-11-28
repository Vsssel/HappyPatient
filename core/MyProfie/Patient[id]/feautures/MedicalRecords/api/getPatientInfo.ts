import type { ApiResponse } from "~/shared/api/type"
import type { GetPatientInfoRequest, GetPatientInfoResponse } from "../types"
import { useApi } from "~/shared/api"

export const getPatientInfo = (params: GetPatientInfoRequest): Promise<ApiResponse<GetPatientInfoResponse>> => {
    const response = useApi<GetPatientInfoResponse>(`doctor/appointments/${params.id}/patient`, {
        method: "GET",
        auth: true
    })

    return response
}