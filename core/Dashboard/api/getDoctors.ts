import { useApi } from "~/shared/api"
import type { DoctorSearchRequest, DoctorSearchResponse, ResponseMessage } from "../types"

export const getDoctors = async (params: DoctorSearchRequest): Promise<ResponseMessage<DoctorSearchResponse[]>> => {
const response = await useApi<DoctorSearchResponse[]>(`patient/doctors`, {
  method: "GET",
  auth: false,
  params: params
})
  return {
      status: response.status,
      message: 'Doctors returned successfully',
      data: response.data
  }
}