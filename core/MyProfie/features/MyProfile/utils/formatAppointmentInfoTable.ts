import type { GetMyAppointmentsResponse } from "../types";
import type { InfoTable } from "../types/table";

export const formatAppointmentInfoTable = (appointment: GetMyAppointmentsResponse[0]): InfoTable[] => {
    const data = ref<InfoTable[]>([])
    data.value.push(
        {
            title: "Doctor's name",
            data: `${appointment.doctor.name} ${appointment.doctor.surname}`
        },
        {
            title: 'Service',
            data: `${appointment.type.name}: ${appointment.category.title}`
        },
        {
            title: 'Addess',
            data: `${appointment.room.address}`
        },
        {
            title: 'Room',
            data: `${appointment.room.title}`
        }
    )

    return data.value
}