import { useApi } from "~/shared/api"
import type { GetMySingleAppointmentResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const getMySingleAppointment = async(id: number): Promise<ApiResponse<GetMySingleAppointmentResponse>> => {
    const response = await useApi<GetMySingleAppointmentResponse>(`patient/appointments/${id}`, {
        method: "GET",
        auth: true
    })

    return response
}