import { useApi } from "~/shared/api"
import type { PatientAuthSignInRequest, PatientAuthSignInResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const postPatientAuthSignIn = async(body: PatientAuthSignInRequest): Promise<ApiResponse<PatientAuthSignInResponse>> => {
    const response = await useApi<PatientAuthSignInResponse>('auth/', {
        methos: "POST",
        auth: true,
        body: body
    })
    return response
}