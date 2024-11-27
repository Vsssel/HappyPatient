import { useApi } from "~/shared/api"
import type { MyScheduleGetRequest, MyScheduleGetResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const getMySchedule = (params: MyScheduleGetRequest): Promise<ApiResponse<MyScheduleGetResponse>> => {
    const response = useApi<MyScheduleGetResponse>(`doctor/schedule/${params.week}`, {
        method: "GET",
        auth: true
    })

    return response
}