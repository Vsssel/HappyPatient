import { useApi } from "../../../shared/api"
import type { DoctorsSearchResourcesRequest, DoctorsSearchResourcesResponse, ResponseMessage } from "../types"

export const getDoctorsResourses = async(params: DoctorsSearchResourcesRequest): Promise<ResponseMessage<DoctorsSearchResourcesResponse>> => {
  const response = await useApi<DoctorsSearchResourcesResponse>('patient/resources', {
    method: 'GET',
    auth: false,
    params: params
  })

  return {
    status: response.status,
    message: 'Resources returned successfully',
    data: response.data 
  }
}