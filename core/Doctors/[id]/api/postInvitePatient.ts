import { useApi } from "~/shared/api"
import type { PostInvitePatientRequest, PostInvitePatientResponse } from "../types"
import type { ApiResponse } from "~/shared/api/type"

export const postInvitePatient = (body: PostInvitePatientRequest): Promise<ApiResponse<PostInvitePatientResponse>> => {
  const response = useApi<PostInvitePatientResponse>('manager/patients', {
    method: 'POST',
    body: body,
    auth: true
  })

  return response
}