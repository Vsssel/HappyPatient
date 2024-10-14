import { useApi } from "~/shared/api";
import type { GetProfileResponse, GetScheduleResponse } from "../types";
import { isAuthorized } from "~/shared/stores/userAuthStore";

export const getDoctorProfile = async (id: number): Promise<GetProfileResponse | undefined> => (
    (await useApi<GetProfileResponse>(`doctors/${id}`, {
        auth: isAuthorized(),
        params: { week: 1 }
    })).data
);

export const getDoctorSchedule = async (
    id: number,
    weekNumber: number = 0
): Promise<GetScheduleResponse[] | undefined> => (
    (await (useApi<GetScheduleResponse[]>(
        `doctors/${id}/${weekNumber}`,
        { auth: isAuthorized() })
    )).data
);