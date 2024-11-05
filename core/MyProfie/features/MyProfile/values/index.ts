import type { GetMyAppointmentsResponse } from "../types";
import { ref } from "vue";

export const appointments = ref<GetMyAppointmentsResponse>()
export const filterBy = ref<number>(0)
export const options = [
    {
        label: 'Upcoming',
        value: 0
    },
    {
        label: 'Past',
        value: 1
    },
    {
        label: 'All',
        value:2
    }
]