export type GetPatientInfoRequest = {
  id: number
}

export type GetPatientInfoResponse = {
  id: number,
  name: string,
  surname: string,
  gender: string,
  birth_date: string
}

export type GetPatientRecordsRequest = {
  id: number;
  record_type: string;
  offset: number;
  limit: number;
}

export type GetPatientRecordsResponse = {
  start: number,
  end: number,
  total: number,
  page: {
    id: number,
    type: string,
    title: string,
    content: string,
    addedTime: string,
    doctor: {
      id: number,
      name: string,
      surname: string,
      avatarUrl: string
    },
    appointment: {
      id: number,
      date: string,
      startTime: string,
      endTime: string,
      type: {
        id: number,
        name: string
      },
      category: {
        id: number,
        title: string
      }
    }
  }[]
}

export type PostPatientRecordsRequest = {
  appointment_id: number,
  type: string,
  title: string,
  content: string
}

export type PostPatientRecordsResponse = {
  detail: string
}

export type PutPatientRecordsRequest = {
  type: string,
  title: string,
  content: string
}

export type PutPatientRecordsResponse = {
  detail: string
}

export type DeletePatientRecordsRequest = {
  id: number
}

export type DeletePatientRecordsResponse = {
  detail: string
}