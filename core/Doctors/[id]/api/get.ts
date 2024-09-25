import type { GetResponse } from "../types";

export const getDoctorProfile = (id: number): GetResponse => ({
    id,
    name: 'Alikhan',
    surname: 'Nuspekov',
    age: 33,
    phoneNumber: '+7 777 7777',
    office: 'F305',
    expInMonthes: 25,
    category: {
        id: 34,
        title: 'Stomatologiya'
    },
    workTime: [
        {
            date: '2024-09-09',
            dayAtWeek: 1,
            startTime: '09:00:00',
            endTime: '16:30:00',
            lunch: {
                startTime: '12:00:00',
                endTime: '13:30:00'
            },
            slots: [{
                id: 3,
                startTime: '10:00:00',
                endTime: '11:00:00',
                mine: true,
                type: 'treat'
            }]
        }
    ]
});