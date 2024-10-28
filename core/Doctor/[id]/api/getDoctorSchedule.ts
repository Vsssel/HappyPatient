import { useApi } from '~/shared/api';
import type { SingleDoctorScheduleRequest, SingleDoctorScheduleResponse } from '../types'
import type { ResponseMessage } from '~/core/Dashboard/types'
import me from '~/shared/stores/User'

export const getDoctorSchedule = async (params: SingleDoctorScheduleRequest): Promise<ResponseMessage<SingleDoctorScheduleResponse>> => {
    const response = await useApi<SingleDoctorScheduleResponse>(`patient/doctors/${params.id}/${params.week_num}`, {
        methos: "GET",
        auth: me.isAuthorized()
    })
    if(response.data){
        return {
            status: response.status,
            message: 'Doctor schedule returned successfully',
            data: response.data
        }
    }
    throw Error('No Data')
}