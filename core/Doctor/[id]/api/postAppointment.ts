import { useApi } from "~/shared/api"
import type { PostAppointmentRequest, SingleDoctorScheduleResponse } from "../types"
import type { ResponseMessage } from "~/core/Dashboard/types"

export const postAppointment = async(id: number, week_num: number, body: PostAppointmentRequest): Promise<ResponseMessage<SingleDoctorScheduleResponse>> => {
    const response = await useApi<SingleDoctorScheduleResponse>(`patient/doctors/${id}/${week_num}`, {
        methos: "POST",
        body: body,
        auth: true
    })

    return {
        status: response.status,
        message: response.message,
        data: response.data ? response.data : {
            worktime: {
                startHours: 8,
                endHours: 18
            },
            schedule: []
        }
    }
}