import { useApi } from "~/shared/api"
import type { GetMyAppointmentsResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const getMyAppointments = async(): Promise<ApiResponse<GetMyAppointmentsResponse>> => {
    const response = await useApi<GetMyAppointmentsResponse>('patient/appointments', {
        method: "GET",
        auth: true
    })

    return response
}