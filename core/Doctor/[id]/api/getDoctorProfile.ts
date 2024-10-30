import { useApi } from '~/shared/api';
import type { SingleDoctorProfileRequest, SingleDoctorProfileResponse } from '../types';
import type { ResponseMessage } from '~/core/Dashboard/types';

export const getDoctorProfile = async (params: SingleDoctorProfileRequest): Promise<ResponseMessage<SingleDoctorProfileResponse | null>> => {
    try{
        const response = await useApi<SingleDoctorProfileResponse>(`patient/doctors/${params.id}`, {
            method: "GET",
            auth: false,
        })
        return {
            status: true,
            message: 'Doctor schedule returned successfully',
            data: response.data ? response.data : null
        }
    }catch(error){
        return {
            status: false,
            message: 'Error while returning doctor`s schedule',
            data: null
        }
    }
}