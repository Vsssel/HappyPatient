import type { GetMyAppointmentsResponse } from "../types"
import { filterBy, appointments } from "../values"
import { ref } from "vue"

export const filterAppointments = (): GetMyAppointmentsResponse | undefined => {
    const filteredAppointments = ref<GetMyAppointmentsResponse>([])
    appointments.value?.forEach(appointment => {
        if(filterBy.value === 0 && !appointment.isFinished){
            filteredAppointments.value?.push(appointment)
        }else if(filterBy.value === 1 && appointment.isFinished){
            filteredAppointments.value?.push(appointment)
        }
    })

    return filterBy.value === 2 ? appointments.value : filteredAppointments.value
}