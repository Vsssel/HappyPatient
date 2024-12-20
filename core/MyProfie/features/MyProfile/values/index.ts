import type { GetMyAppointmentsResponse } from "../types";
import { ref } from "vue";

export const appointments = ref<GetMyAppointmentsResponse>()
export const filterBy = ref<number | string>('upcoming')