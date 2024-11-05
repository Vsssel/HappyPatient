import { useApi } from "~/shared/api"
import type { ApiResponse } from "~/shared/api/type"
import type { GetMySingleAppointmentResponse, PutMySingleAppointementRequest, PutMySingleAppointementResponse } from "../types"

export const putMySingleAppointment = async(id: number, body: PutMySingleAppointementRequest): Promise<ApiResponse<GetMySingleAppointmentResponse>> => {
    const response = await useApi<GetMySingleAppointmentResponse>(`patient/appointments/${id}`, {
        method: "PUT",
        body: body,
        auth: true
    })

    return response
}