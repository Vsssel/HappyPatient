import type { ManagerSlotStatus, SlotStatus, WorkingStatus } from './enums'
import type { GetDoctorScheduleForManagerResponse } from './api'

export type SlotInfo = {
    id?: number
    status: SlotStatus | ManagerSlotStatus,
    dayAtWeek: number,
    indexes: Indexes,
    patient?: GetDoctorScheduleForManagerResponse['schedule'][0]['slots'][0]['patient']
};

export type EmptySlot = {
    dayIndex: number,
    slotIndex: number,
    status: WorkingStatus
};

export type HourSlotsIndexRelation = {
    hour: number,
    slotIndexes: number[]
};

export type Indexes = {
    start: number,
    end: number
};

export type WeekdayFormat = {
    index: number,
    label: string,
    short: string,
    date: string
};

export type BookingFormDefault = {
    dayIndex: number,
    slotStartIndex: number
} | undefined;