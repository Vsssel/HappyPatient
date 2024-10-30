import { useApi } from "~/shared/api"
import type { PostPatientAuthRequest, PostPatientAuthResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const postPatientAuth = async(body: PostPatientAuthRequest): Promise<ApiResponse<PostPatientAuthResponse>> => {
    const response = await useApi<PostPatientAuthResponse>('patient/auth' , {
        method: "POST",
        auth: false,
        body: body
    })
    return response
}