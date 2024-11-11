import { useApi } from "~/shared/api"
import type { PostAppointmentRequest, PostAppointmentResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const postAppointment = async(id: number, week_num: number, body: PostAppointmentRequest): Promise<ApiResponse<PostAppointmentResponse>> => {
    const response = await useApi<PostAppointmentResponse>(`patient/appointments`, {
        method: "POST",
        body: body,
        auth: true
    })

    return response
}