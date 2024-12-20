export type GetMyAppointmentsResponse = {
  start: number,
  end: number,
  total: number,
  page: {
    id: number,
    index: number,
    date: string,
    startTime: string,
    endTime: string,
    price: number,
    isFinished: true,
    isPaid: true,
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
      location: string,
      title: string
    },
    doctor: {
      id: number,
      name: string,
      surname: string,
      avatarUrl: string
    }
  }[]
}

export type GetMyAppointmentsRequest = {
  time_status?: string,
  offset: number,
  limit: number
}