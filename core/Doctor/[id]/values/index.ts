import type { EmptySlot, SingleDoctorProfileResponse, SingleDoctorScheduleResponse, SlotInfo, WorkingStatus } from '../types'

export * from './slots'
export const isVisible = ref<boolean>(false)
export const selectedSlot = ref<Date>(new Date())
export const doctor = ref<SingleDoctorProfileResponse | null>(null)
export const weekNumber = ref<number>(0)
export const worktime = ref<SingleDoctorScheduleResponse['worktime']>({
    startHours: 6,
    endHours: 20
});
export const id = ref()
export const schedule = ref<SingleDoctorScheduleResponse['schedule']>([]);
export const weekDates = ref<string[]>([]);
export const whereNoSlots = ref<EmptySlot[]>([]);
export const slots = ref<SlotInfo[]>([]);
export const isWorkingTime = ref<WorkingStatus[][]>([]);