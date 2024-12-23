import { useApi } from "~/shared/api"
import type { PostPatientAuthSignUpRequest, PostPatientAuthSignUpResponse,  } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const postPatientAuthSignUp = async(body: PostPatientAuthSignUpRequest): Promise<ApiResponse<PostPatientAuthSignUpResponse>> => {
    const response = await useApi<PostPatientAuthSignUpResponse>('patient/auth/sign-up', {
        method: "POST",
        auth: false,
        body: body
    })
    return response
}