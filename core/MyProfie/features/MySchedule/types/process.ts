import type { SlotStatus, WorkingStatus } from './enum'
import type { MyScheduleGetResponse } from './api';

export type SlotInfo = {
    id?: number
    status: SlotStatus,
    dayAtWeek: number,
    indexes: Indexes,
    startTime: string,
    endTime: string,
    date: string,
    patient: MyScheduleGetResponse['schedule'][0]['slots'][0]['patient'] | null
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