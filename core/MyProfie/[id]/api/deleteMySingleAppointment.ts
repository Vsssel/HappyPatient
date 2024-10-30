import { useApi } from "~/shared/api"
import type { ApiResponse } from "~/shared/api/type"
import type { DeleteMySingleAppointmentResponse } from "../types"

export const deleteMySingleAppointmentResponse = (id: number): Promise<ApiResponse<DeleteMySingleAppointmentResponse>> => {
    const response = useApi<DeleteMySingleAppointmentResponse>(`patient/appointments/${id}`, {
        method: 'DELETE',
        auth: true
    })

    return response
}