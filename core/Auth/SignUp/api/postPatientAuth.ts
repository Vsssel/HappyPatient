import { useApi } from "~/shared/api"
import type { PostPatientAuthRequest, PostPatientAuthResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const postPatientAuth = async(body: PostPatientAuthRequest): Promise<ApiResponse<PostPatientAuthResponse>> => {
    const response = await useApi<PostPatientAuthResponse>('patient/auth' , {
        methos: "POST",
        auth: false,
        body: body
    })
    return response
}