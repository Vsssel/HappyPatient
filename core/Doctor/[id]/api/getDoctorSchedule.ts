import { useApi } from '~/shared/api';
import type { SingleDoctorScheduleRequest, SingleDoctorScheduleResponse } from '../types';
import type { ResponseMessage } from '~/core/Dashboard/types';

export const getDoctorSchedule = async (params: SingleDoctorScheduleRequest): Promise<ResponseMessage> => {
    try{
        const response = await useApi<SingleDoctorScheduleResponse>(`patient/doctors/${params.id}/${params.week_num}`, {
            methos: "GET",
            auth: false
        })
        return {
            status: true,
            message: 'Doctor schedule returned successfully',
            data: response.data
        }
    }catch(error){
        return {
            status: false,
            message: 'Error while returning doctor`s schedule',
            data: null
        }
    }
}