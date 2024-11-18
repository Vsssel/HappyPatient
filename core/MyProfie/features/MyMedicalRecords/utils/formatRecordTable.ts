import type { GetMyMedicalRecordsResponse, InfoTable } from "../types";

export const formatRecordTable = (record: GetMyMedicalRecordsResponse['page'][0]): InfoTable[] => {
    const data = ref<InfoTable[]>([
        {
            title: "Doctor's name",
            data: `${record.doctor.name} ${record.doctor.surname}`
        },
        {
            title: 'Service',
            data: `${record.appointment.category.title}: ${record.appointment.type.name}`
        },
        {
            title: 'History Type',
            data: `${record.type}`
        },
        {
            title: 'History Title',
            data: `${record.title}`
        }
    ])

    return data.value;
}