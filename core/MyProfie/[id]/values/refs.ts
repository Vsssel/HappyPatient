import { ref } from "vue"
import type { GetMyAppointmentResourseResponse, GetMySingleAppointmentResponse } from "../types"

export const values = ref({
    typeId: 0,
    date: new Date(),
    startsAt: new Date(),
    endsAt: new Date()
})
export const disabled = ref<boolean>(true)
export const isUpdating = ref<boolean>(false)
export const resource = ref<GetMyAppointmentResourseResponse>()
export const errorStart = ref<string>('')
export const errorEnd = ref<string>('')
export const isFuture = ref<boolean>(false)
export const appointment = ref<GetMySingleAppointmentResponse>({
    id: 0,
    date: '',
    index: 0,
    startTime: '',
    endTime: '',
    price: 0,
    isFinished: true,
    type: {
        id: 0,
        name: '',
    },
    category: {
        id: 0,
        title: '',
    },
    room: {
        id: 0,
        building_id: 0,
        address: '',
        title: '',
    },
    doctor: {
        id: 0,
        name: '',
        surname: '',
        avatarUrl: '',
    },
    patient: {
        id: 0,
        name: '',
        surname: '',
    },
})

export const totalPrice = ref<number>()
