import { useApi } from "~/shared/api"
import type { GetMyAppointmentResourseRequest, GetMyAppointmentResourseResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const getMyAppointmentResources = async (id: number, date: string, params: GetMyAppointmentResourseRequest): Promise<ApiResponse<GetMyAppointmentResourseResponse>> => {
    const response = await useApi<GetMyAppointmentResourseResponse>(`patient/doctors/${id}/day/${date}`, {
        method: "GET",
        auth: true,
        params: params
    })
    return response
}