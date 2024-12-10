import { useApi } from "~/shared/api"
import type { GetPatientsResourseRequest, GetPatientsResourseResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const getPatientsResourse = (params: GetPatientsResourseRequest): Promise<ApiResponse<GetPatientsResourseResponse>> => {
    const response = useApi<GetPatientsResourseResponse>('manager/patients', {
        method: 'GET',
        params: params,
        auth: true
    })

    return response
}