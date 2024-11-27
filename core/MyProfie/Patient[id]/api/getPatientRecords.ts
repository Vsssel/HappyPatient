import type { ApiResponse } from "~/shared/api/type";
import type { GetPatientRecordsRequest, GetPatientRecordsResponse } from "../types";
import { useApi } from "~/shared/api";

export const getPatientRecords = (params: GetPatientRecordsRequest): Promise<ApiResponse<GetPatientRecordsResponse>> => {
    const response = useApi<GetPatientRecordsResponse>(`doctor/appointments/${params.id}/patient/medical-records`, {
        method: "GET",
        params: params,
        auth: true
    })

    return response
}