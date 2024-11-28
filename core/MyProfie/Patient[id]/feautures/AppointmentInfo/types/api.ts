export type GetAppointmentRequest = {
  id: number
}

export type GetAppointmentResponse = {
  id: number,
  date: string,
  index: number,
  startTime: string,
  endTime: string,
  price: number,
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
  },
  patient: {
    id: number,
    name: string,
    surname: string
  },
  receipt: {
    id: number,
    timestamp: string,
    method: string,
    provider: string,
    amount: number
  },
  medicalRecords: {
    title: string,
    type: string,
    addedTime: string,
    content: string
  }[]
}