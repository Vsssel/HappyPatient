import type { EmptySlot, GetDoctorScheduleForManagerResponse, GetPatientsResourseResponse, SingleDoctorProfileResponse, SingleDoctorScheduleResponse, SlotInfo, WorkingStatus } from '../types'

export const isVisible = ref()
export const selectedSlot = ref<Date>(new Date())
export const doctor = ref<SingleDoctorProfileResponse | null>(null)
export const weekNumber = ref<number>(0)
export const worktime = ref<SingleDoctorScheduleResponse['worktime']>({
    startHours: 6,
    endHours: 20
});
export const id = ref()
export const schedule = ref<SingleDoctorScheduleResponse['schedule'] | GetDoctorScheduleForManagerResponse['schedule']>([]);
export const weekDates = ref<string[]>([]);
export const whereNoSlots = ref<EmptySlot[]>([]);
export const slots = ref<SlotInfo[]>([]);
export const isWorkingTime = ref<WorkingStatus[][]>([])
export const values = ref({
  typeId: 1,
  date: new Date(selectedSlot.value),
  startsAt: selectedSlot.value,
  endsAt: selectedSlot.value
})
export let isUpdating = ref<boolean>(false)
export const type = ref('1')
export const appointmentFor = ref<'Me' | 'Patient'>('Me')
export const selectedPatient = ref<String>('')
export const selectedPatientID = ref<any>(0)
export const patients = ref<GetPatientsResourseResponse>([])
export const totalPrice = ref(doctor.value?.price_list.filter(price => price.typeId === values.value.typeId)[0].price)
export const suggestions = ref<string[]>([])
export const isPatientHasAccount = ref<boolean>(true)
export const email = ref<string>('')
export const emailError = ref<string>('')
export const searchError = ref<string>('')
