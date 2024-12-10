import { useApi } from "~/shared/api"
import type { GetDoctorScheduleForManagerResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const getDoctorScheduleForManager = (id: number, week_num: number): Promise<ApiResponse<GetDoctorScheduleForManagerResponse>> => {
    const response = useApi<GetDoctorScheduleForManagerResponse>(`manager/doctors/${id}/${week_num}`, {
        method: "GET",
        auth: true
    })

    return response
}