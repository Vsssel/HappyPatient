export type AppointmentPostRequest = {
    doctorId: number;
    type: string;
    date: string;
    startTime: string;
    endTime: string;
}

export type AppointmentGetResponse = {
    id: number;
    type: string;
    date: string;
    startTime: string;
    endTime: string;
    precalculatedCost: number;
    finalCost: number|null;
    doctor: {
        id: number;
        name: string;
        surname: string;
        age: number;
        phoneNumber: string;
        office: string;
        expInMonthes: number;
        category: {
            id: number;
            title: string;
        }
    }
}[]