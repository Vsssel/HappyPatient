export type GetProfileResponse = {
    id: number,
    name: string,
    surname: string,
    age: number,
    phoneNumber: string,
    office: string,
    expInMonthes: number,
    category: GetSubResponseCategory,
    workTime: GetScheduleResponse[]
};

export type GetSubResponseCategory = {
    id: number,
    title: string
};

export type GetScheduleResponse = {
    date: string,
    dayAtWeek: number,
    startTime: string,
    endTime: string,
    lunch: {
        startTime: string,
        endTime: string
    },
    slots: {
        id: number,
        startTime: string,
        endTime: string,
        mine: boolean,
        type: string | null
    }[]
};