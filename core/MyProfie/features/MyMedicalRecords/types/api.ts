export type GetMyMedicalRecordsRequest = {
  record_type: string
  offset: number
  limit: number
}

export type GetMyMedicalRecordsResponse = {
  start: 0,
  end: 0,
  total: 0,
  page: {
    type: string,
    title: string,
    content: string,
    addedTime: string,
    doctor: {
      id: 0,
      name: string,
      surname: string,
      avatarUrl: string
    },
    appointment: {
      id: 0,
      date: string,
      startTime: string,
      endTime: string,
      type: {
        id: 0,
        name: string
      },
      category: {
        id: 0,
        title: string
      }
    }
  }[]
}