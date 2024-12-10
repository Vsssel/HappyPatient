export type SingleDoctorProfileResponse = {
    id: number,
    name: string,
    surname: string,
    avatarUrl: string,
    age: number,
    expInMonthes: number,
    category: {
        id: number,
        title: string
    },
    office: {
        id: number,
        building_id: number,
        address: string,
        title: string
    },
    price_list: {
        typeId: number,
        typeName: string,
        price: number
    }[],
    experience: {
        id: number,
        organization: string,
        startDate: string,
        endDate: string,
        position: string,
        hoursAtDay: number
    }[],
    education: {
        id: number,
        organization: string,
        startYear: number,
        endYear: number,
        gpa: number,
        gpaFrom: number
    }[]
}

export type SingleDoctorProfileRequest = {
    id: number;
}

export type SingleDoctorScheduleResponse = {
  worktime: {
      startHours: number,
      endHours: number
  },
  schedule: {
      date: string,
      dayAtWeek: number,
      startTime: string,
      endTime: string,
      lunch?: {
          startTime: string,
          endTime: string
      },
      slots: {
          id: number,
          startTime: string,
          endTime: string,
          mine: boolean
      }[]
  }[]
}

export type SingleDoctorScheduleRequest = {
    id: number,
    week_num: number
}

export type PostAppointmentRequest = {
    doctorId: number
    date: string;
    typeId: number;
    startsAt: string;
    endsAt: string;
}

export type PostAppointmentResponse = {
    detail: string
}

export type GetDoctorScheduleForManagerRequest = {
    id: number;
    week_num: number;
}

export type GetDoctorScheduleForManagerResponse = {
  worktime: {
    startHours: number,
    endHours: number
  },
  showPatients: boolean,
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
      status: "booked" | "confirmed" | "missed",  
      mine: boolean,
      patient: {
        id: number,
        name: string,
        surname: string
      }
    }[]
  }[]
}

export type GetPatientsResourseRequest = {
  fullname?: String,
  iin?: string
}

export type GetPatientsResourseResponse = {
  id: number,
  name: string,
  surname: string,
  age: number,
  avatarUrl: string
}[]

export type PostAppointmentForPatientRequest = {
  doctorId: number,
  date: string,
  typeId: number,
  startsAt: string,
  endsAt: string
}

export type PostAppointmentForPatientResponse = {
  detail: string
}

export type PostInvitePatientRequest = {
  email: string
}

export type PostInvitePatientResponse = {
  detail: string
}