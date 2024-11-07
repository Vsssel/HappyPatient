import type { GetMyAppointmentsResponse } from "../types"
import { filterBy, appointments } from "../values"
import { ref } from "vue"

export const filterAppointments = (): GetMyAppointmentsResponse | undefined => {
    const filteredAppointments = ref<GetMyAppointmentsResponse>([])
    appointments.value?.forEach(appointment => {
        const [day, month, year] = appointment.date.split('.').map(Number)
        const [startHour, startMinute] = appointment.startTime.split(':').map(Number)
        const isFuture = new Date(year, month-1, day, startHour, startMinute) > new Date()
        if(filterBy.value === 0 && isFuture){
            filteredAppointments.value?.push(appointment)
        }else if(filterBy.value === 1 && !isFuture){
            filteredAppointments.value?.push(appointment)
        }
    })

    return filterBy.value === 2 ? appointments.value : filteredAppointments.value
}