export type GetMySingleAppointmentResponse = {
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
    location: string,
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

export type DeleteMySingleAppointmentResponse = {
  detail: string
}

export type PutMySingleAppointementRequest = {
  doctorId: number;
  date: string;
  typeId: number;
  startsAt: string;
  endsAt: string
}

export type PutMySingleAppointementResponse = {
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
    location: string,
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

export type GetMyAppointmentResourseResponse = {
  freeSlots: {
    startTime: string;
    endTime: string
  }[];
  priceList: {
    typeId: number;
    typeName: string;
    price: number
  }[]
}

export type GetMyAppointmentResourseRequest = {
  except_slot_id: number;
  duration: number;
}

export type PaymentInfo = {
  title: string;
  info: string;
}