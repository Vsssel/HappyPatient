export type SingleDoctorProfileResponse = {
    id: number,
    name: string,
    surname: string,
    avatarUrl: string,
    age: number,
    expInMonthes: number,
    category: {
        id: number,
        title: string
    },
    office: {
        id: number,
        building_id: number,
        address: string,
        title: string
    },
    price_list: {
        typeId: number,
        typeName: string,
        halfHourPrice: number
    }[],
    experience: {
        id: number,
        organization: string,
        startDate: string,
        endDate: string,
        position: string,
        hoursAtDay: number
    }[],
    education: {
        id: number,
        organization: string,
        startYear: number,
        endYear: number,
        gpa: number,
        gpaFrom: number
    }[]
}

export type SingleDoctorProfileRequest = {
    id: number;
}

export type SingleDoctorScheduleResponse = {
    worktime: {
        startHours: number,
        endHours: number
    },
    schedule: {
        date: string,
        dayAtWeek: number,
        startTime: string,
        endTime: string,
        lunch?: {
            startTime: string,
            endTime: string
        },
        slots: {
            id: number,
            startTime: string,
            endTime: string,
            mine: boolean
        }[]
    }[]
}

export type SingleDoctorScheduleRequest = {
    id: number,
    week_num: number
}

export type PostAppointmentRequest = {
    doctorId: number
    date: string;
    typeId: number;
    startsAt: string;
    endsAt: string;
}

export type PostAppointmentResponse = {
    detail: string
}