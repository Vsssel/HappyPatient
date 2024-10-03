import { useApi } from "~/shared/api"
import type { SearchRequest, ResponseMessage } from "../types"

export const getDoctors = async (params: SearchRequest): Promise<ResponseMessage> => {
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