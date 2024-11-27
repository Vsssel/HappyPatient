import type { EmptySlot, MyScheduleGetResponse, SlotInfo, WorkingStatus } from '../types'

export * from './slots'
export const weekNumber = ref<number>(0)
export const worktime = ref<MyScheduleGetResponse['worktime']>({
    startHours: 6,
    endHours: 20
});
export const schedule = ref<MyScheduleGetResponse['schedule'] | null>(null);
export const weekDates = ref<string[]>([]);
export const whereNoSlots = ref<EmptySlot[]>([]);
export const slots = ref<SlotInfo[]>([]);
export const isWorkingTime = ref<WorkingStatus[][]>([]);