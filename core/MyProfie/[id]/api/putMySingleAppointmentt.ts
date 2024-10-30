import { useApi } from "~/shared/api"
import type { ApiResponse } from "~/shared/api/type"
import type { PutMySingleAppointementRequest, PutMySingleAppointementResponse } from "../types"

export const putMySingleAppointment = async(id: number, body: PutMySingleAppointementRequest): Promise<ApiResponse<PutMySingleAppointementResponse>> => {
    const response = await useApi<PutMySingleAppointementResponse>(`patient/appointments/${id}`, {
        method: "PUT",
        body: body,
        auth: true
    })

    return response
}