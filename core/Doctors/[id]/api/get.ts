import { useApi } from "~/shared/api";
import type { GetResponse } from "../types";
import type { ApiResponse } from "~/shared/api/type";
import { isAuthorized } from "~/shared/stores/userAuthStore";

export const getDoctorProfile = (
    id: number,
    weekNumber: number = 0
): Promise<GetResponse | undefined> => (
    useApi<GetResponse>(`/doctors/${id}`, {
        auth: isAuthorized(),
        params: { 'week': weekNumber }
    }).then(response => response.data)
);