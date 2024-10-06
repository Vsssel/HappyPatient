import { useApi } from "../../../shared/api"
import type { DoctorsSearchResourcesRequest, DoctorsSearchResourcesResponse, ResponseMessage } from "../types"

export const getDoctorsResourses = async(params: DoctorsSearchResourcesRequest): Promise<ResponseMessage> => {
    try{
        const response = await useApi<DoctorsSearchResourcesResponse>('patient/resources', {
            methos: 'GET',
            auth: false,
            params: params
        })

        return {
            status: true,
            message: 'Resources returned successfully',
            data: response.data
        }
    }catch(error){
        return {
            status: false,
            message: 'Cannot return resources',
            data: null
        }
    }
}