import { useApi } from "~/shared/api"
import type { PostAppointmentForPatientRequest, PostAppointmentForPatientResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const postAppointmentForPatient = (id: number, body: PostAppointmentForPatientRequest): Promise<ApiResponse<PostAppointmentForPatientResponse>> => {
    const response = useApi<PostAppointmentForPatientResponse>(`manager/patients/${id}`, {
        method: 'POST',
        body: body,
        auth: true
    })

    return response
}