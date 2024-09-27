import { useApi } from "~/shared/api";
import type { GetProfileResponse, GetScheduleResponse } from "../types";
import type { ApiResponse } from "~/shared/api/type";
import { isAuthorized } from "~/shared/stores/userAuthStore";

export const getDoctorProfile = (id: number): Promise<GetProfileResponse | undefined> => (
    useApi<GetProfileResponse>(`/doctors/${id}`, {
        auth: isAuthorized(),
        params: { 'week': 0 }
    }).then(response => response.data)
);

export const getDoctorSchedule = (
    id: number,
    weekNumber: number = 0
): Promise<GetScheduleResponse[] | undefined> => (
    useApi<GetScheduleResponse[]>(`/doctors/${id}/${weekNumber}`, { auth: isAuthorized() })
        .then(response => response.data)
);