import { useApi } from '~/shared/api';
import type { SingleDoctorScheduleRequest, SingleDoctorScheduleResponse } from '../types';
import type { ResponseMessage } from '~/core/Dashboard/types';

export const getDoctorSchedule = async (params: SingleDoctorScheduleRequest): Promise<ResponseMessage<SingleDoctorScheduleResponse>> => {
    try{
        const response = await useApi<SingleDoctorScheduleResponse>(`patient/doctors/${params.id}/${params.week_num}`, {
            methos: "GET",
            auth: false
        })
        if(response.data){
            return {
                status: true,
                message: 'Doctor schedule returned successfully',
                data: response.data
            }
        }
        throw Error('No Data')
    }catch(error){
        return {
            status: false,
            message: 'Error while returning doctor`s schedule',
            data: {
                worktime: {
                    startHours: 6,
                    endHours: 20
                },
                schedule: []
            }
        }
    }
}