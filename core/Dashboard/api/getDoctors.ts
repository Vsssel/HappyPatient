import { useApi } from "~/shared/api"
import type { DoctorSearchRequest, ResponseMessage } from "../types"

export const getDoctors = async (params: DoctorSearchRequest): Promise<ResponseMessage> => {
  try {
      const response = await useApi<any>('patient/doctors', {
      methos: "GET",
      auth: false,
      params: params
    })
    return {
        status: true,
        message: 'Doctors returned successfully',
        data: response.data
    }
  }catch(error){
    return {
        status: false,
        message: 'Error while returning doctors',
        data: null
    }
  }
}