import type { GetMyAppointmentsResponse } from "../types"
import { filterBy, appointments } from "../values"
import { ref } from "vue"
import { isFuture } from "./isFuture"

export const filterAppointments = (): GetMyAppointmentsResponse | undefined => {
    const filteredAppointments = ref<GetMyAppointmentsResponse>([])
    appointments.value?.forEach(appointment => {
        if(Number(filterBy.value) === 0 && isFuture(appointment)){
            filteredAppointments.value?.push(appointment)
        }else if(Number(filterBy.value) === 1 && !isFuture(appointment)){
            filteredAppointments.value?.push(appointment)
        }
    })

    return Number(filterBy.value) === 2 ? appointments.value : filteredAppointments.value
}