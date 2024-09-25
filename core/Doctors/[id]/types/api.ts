export type GetResponse = {
    id: number,
    name: string,
    surname: string,
    age: number,
    phoneNumber: string,
    office: string,
    expInMonthes: number,
    category: GetSubResponseCategory,
    workTime: GetSubResponseWorkTime[]
};

export type GetSubResponseCategory = {
    id: number,
    title: string
};

export type GetSubResponseWorkTime = {
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