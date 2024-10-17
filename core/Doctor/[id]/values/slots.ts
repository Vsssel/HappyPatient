import { SLOTS_PER_HOUR } from '~/shared/values';
import { MIN_SLOT_DURATION } from './worktime';
import type { EmptySlot, Indexes, SlotInfo, SingleDoctorScheduleResponse } from '../types';

export const timeToSlotIndex = (worktime: SingleDoctorScheduleResponse['worktime'], time: string): number => {
    const [ hoursStr, minutesStr ] = time.split(':');
    return SLOTS_PER_HOUR * (parseInt(hoursStr) - worktime.startHours) + Math.floor(parseInt(minutesStr)/MIN_SLOT_DURATION);
};

export const slotIndexToDatetime = (
    worktime: SingleDoctorScheduleResponse['worktime'],
    date: string,
    index: number
): Date => {
    const [day, month, year] = date.split('-').map(Number);
    return new Date(
        year, month - 1, day,
        worktime.startHours + Math.floor(index / SLOTS_PER_HOUR),
        MIN_SLOT_DURATION * (index % SLOTS_PER_HOUR), 0
    );
}

export const slotKey = (slot: SlotInfo) => `${slot.dayAtWeek}-${slot.indexes.start}`;
export const emptySlotKey = (slot: EmptySlot) => `${slot.dayIndex}-${slot.slotIndex}`;

export const slotHeight = (indexes: Indexes) => indexes.end - indexes.start;