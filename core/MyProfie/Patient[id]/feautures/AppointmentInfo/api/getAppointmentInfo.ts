import { useApi } from "~/shared/api"
import type { GetAppointmentRequest, GetAppointmentResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const getAppointmentInfo = async(params: GetAppointmentRequest): Promise<ApiResponse<GetAppointmentResponse>> => {
  const response = await useApi<GetAppointmentResponse>(`patient/appointments/${params.id}`, {
    method: 'GET',
    auth: true
  })

  return response
}