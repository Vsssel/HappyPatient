const response = {
    id: 1,
    name: "Alikhan",
    surname: "Nuspekov",
    age: 33,
    phoneNumber: "+7 777 7777",
    office: "F305",
    expInMonthes: 25,
    category: {
        id: 34,
        title: "Stomatologiya"
    },
    workTime: [
        {
            date: "23-09-2024",
            dayAtWeek: 1,
            startTime: "09:00:00",
            endTime: "17:30:00",
            lunch: {
                startTime: "12:00:00",
                endTime: "13:30:00"
            },
            slots: [
                {
                    id: 3,
                    startTime: "10:00:00",
                    endTime: "10:30:00",
                    mine: true,
                    type: "treat"
                },
                {
                    id: 5,
                    startTime: "11:00:00",
                    endTime: "11:30:00",
                    mine: false,
                    type: null
                },
                {
                    id: 6,
                    startTime: "11:30:00",
                    endTime: "12:00:00",
                    mine: true,
                    type: "treat"
                },
                {
                    id: 4,
                    startTime: "13:30:00",
                    endTime: "14:00:00",
                    mine: false,
                    type: null
                },
                {
                    id: 7,
                    startTime: "14:30:00",
                    endTime: "15:00:00",
                    mine: false,
                    type: null
                },
                {
                    id: 10,
                    startTime: "15:00:00",
                    endTime: "15:30:00",
                    mine: false,
                    type: null
                }
            ]
        },
        {
            date: "24-09-2024",
            dayAtWeek: 2,
            startTime: "09:00:00",
            endTime: "17:30:00",
            lunch: {
                startTime: "12:00:00",
                endTime: "12:30:00"
            },
            slots: [
                {
                    id: 3,
                    startTime: "10:00:00",
                    endTime: "10:30:00",
                    mine: true,
                    type: "treat"
                },
                {
                    id: 5,
                    startTime: "11:00:00",
                    endTime: "11:30:00",
                    mine: false,
                    type: null
                },
                {
                    id: 6,
                    startTime: "11:30:00",
                    endTime: "12:00:00",
                    mine: true,
                    type: "treat"
                },
                {
                    id: 4,
                    startTime: "13:30:00",
                    endTime: "14:00:00",
                    mine: false,
                    type: null
                },
                {
                    id: 7,
                    startTime: "14:30:00",
                    endTime: "15:00:00",
                    mine: false,
                    type: null
                },
                {
                    id: 10,
                    startTime: "15:00:00",
                    endTime: "15:30:00",
                    mine: false,
                    type: null
                }
            ]
        },
        {
            date: "25-09-2024",
            dayAtWeek: 3,
            startTime: "09:00:00",
            endTime: "15:30:00",
            lunch: {
                startTime: "12:00:00",
                endTime: "13:30:00"
            },
            slots: [
                {
                    id: 3,
                    startTime: "10:00:00",
                    endTime: "10:30:00",
                    mine: true,
                    type: "treat"
                },
                {
                    id: 5,
                    startTime: "11:00:00",
                    endTime: "11:30:00",
                    mine: false,
                    type: null
                },
                {
                    id: 6,
                    startTime: "11:30:00",
                    endTime: "12:00:00",
                    mine: true,
                    type: "treat"
                },
                {
                    id: 4,
                    startTime: "13:30:00",
                    endTime: "14:00:00",
                    mine: false,
                    type: null
                },
                {
                    id: 7,
                    startTime: "14:30:00",
                    endTime: "15:00:00",
                    mine: false,
                    type: null
                },
                {
                    id: 10,
                    startTime: "15:00:00",
                    endTime: "15:30:00",
                    mine: false,
                    type: null
                }
            ]
        },
        {
            date: "26-09-2024",
            dayAtWeek: 4,
            startTime: "11:00:00",
            endTime: "14:00:00",
            lunch: {
                startTime: "12:30:00",
                endTime: "13:00:00"
            },
            slots: [
                {
                    id: 7,
                    startTime: "12:00:00",
                    endTime: "12:30:00",
                    mine: false,
                    type: null
                },
                {
                    id: 10,
                    startTime: "13:30:00",
                    endTime: "14:00:00",
                    mine: false,
                    type: null
                }
            ]
        },
        {
            date: "27-09-2024",
            dayAtWeek: 5,
            startTime: "08:00:00",
            endTime: "18:00:00",
            lunch: {
                startTime: "12:00:00",
                endTime: "12:00:00"
            },
            slots: []
        },
        {
            date: "28-09-2024",
            dayAtWeek: 6,
            startTime: "14:00:00",
            endTime: "16:00:00",
            lunch: {
                startTime: "12:00:00",
                endTime: "12:00:00"
            },
            slots: [
                {
                    id: 7,
                    startTime: "15:00:00",
                    endTime: "15:30:00",
                    mine: true,
                    type: 'treat'
                },
            ]
        },
        {
            date: "29-09-2024",
            dayAtWeek: 0,
            startTime: "12:00:00",
            endTime: "12:00:00",
            lunch: {
                startTime: "12:00:00",
                endTime: "12:00:00"
            },
            slots: []
        }
    ]
};

export default response;