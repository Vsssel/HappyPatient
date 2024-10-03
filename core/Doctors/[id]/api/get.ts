import { useApi } from '~/shared/api';
import type { GetProfileResponse, GetScheduleResponse } from '../types';
import me from '~/shared/stores/User';


export const getDoctorProfile = async (id: number): Promise<GetProfileResponse | undefined> => (
    (await useApi<GetProfileResponse>(`/doctors/${id}`, {
        auth: me.isAuthorized(),
        params: { 'week': 0 }
    })).data
);

export const getDoctorSchedule = async (
    id: number,
    weekNumber: number = 0
): Promise<GetScheduleResponse[] | undefined> => (
    (await (useApi<GetScheduleResponse[]>(
        `/doctors/${id}/${weekNumber}`,
        { auth: me.isAuthorized() })
    )).data
);