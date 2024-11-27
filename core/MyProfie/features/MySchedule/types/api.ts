export type MyScheduleGetRequest = {
    week: number;
}

export type MyScheduleGetResponse = {
  worktime: {
    startHours: number,
    endHours: number
  },
  schedule: {
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
      type: {
        id: number,
        name: string
      },
      patient: {
        id: number,
        name: string,
        surname: string
      }
    }[]
  }[]
}