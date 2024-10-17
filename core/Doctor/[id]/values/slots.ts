import { SLOTS_PER_HOUR } from '~/shared/values';
import type { EmptySlot, Indexes, SlotInfo, SingleDoctorScheduleResponse } from '../types';

export const timeToSlotIndex = (worktime: SingleDoctorScheduleResponse['worktime'], time: string): number => {
    const [ hoursStr, minutesStr ] = time.split(':');
    const minSlotDuration = 60 / SLOTS_PER_HOUR;
    return SLOTS_PER_HOUR * (parseInt(hoursStr) - worktime.startHours) + Math.floor(parseInt(minutesStr)/minSlotDuration);
};

export const slotIndexToDatetime = (
    worktime: SingleDoctorScheduleResponse['worktime'],
    date: string,
    index: number
): Date => {
    const [day, month, year] = date.split('.').map(Number);
    const minSlotDuration = 60 / SLOTS_PER_HOUR;
    return new Date(
        year, month - 1, day,
        worktime.startHours + Math.floor(index / SLOTS_PER_HOUR),
        minSlotDuration * (index % SLOTS_PER_HOUR), 0
    );
};

export const slotKey = (slot: SlotInfo) => `${slot.dayAtWeek}-${slot.indexes.start}`;
export const emptySlotKey = (slot: EmptySlot) => `${slot.dayIndex}-${slot.slotIndex}`;

export const slotHeight = (indexes: Indexes) => indexes.end - indexes.start;