import type { GetMyAppointmentsResponse } from "../types";

export const isFuture = (appointment: GetMyAppointmentsResponse[0]) => {
    const [day, month, year] = appointment.date.split('.').map(Number)
    const [startHour, startMinute] = appointment.startTime.split(':').map(Number)
    const isFuture = new Date(year, month-1, day, startHour, startMinute) > new Date()
    return isFuture
}