import { useApi } from "~/shared/api"
import type { GetMyAppointmentsRequest, GetMyAppointmentsResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const getMyAppointments = async(params: GetMyAppointmentsRequest): Promise<ApiResponse<GetMyAppointmentsResponse>> => {
    const response = await useApi<GetMyAppointmentsResponse>('patient/appointments', {
        method: "GET",
        params: params,
        auth: true
    })

    return response
}