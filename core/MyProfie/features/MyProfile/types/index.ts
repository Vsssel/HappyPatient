export type GetMyAppointmentsResponse = {
    id: number,
    index: number,
    date: string,
    startTime: string,
    endTime: string,
    isFinished: boolean,
    type: {
        id: number,
        name: string
    },
    category: {
        id: number,
        title: string
    },
    room: {
        id: number,
        building_id: number,
        address: string,
        title: string
    },
    doctor: {
        id: number,
        name: string,
        surname: string,
        avatarUrl: string
    }
}[]