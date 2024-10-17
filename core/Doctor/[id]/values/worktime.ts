import { SLOTS_PER_HOUR } from '~/shared/values';
import type { HourSlotsIndexRelation } from '../types';


export const SLOTS_COUNT = SLOTS_PER_HOUR * (WORKDAY.END - WORKDAY.START);

export const MIN_SLOT_DURATION = 60 / SLOTS_PER_HOUR;

export const workhours: number[] = [];
for (let i = WORKDAY.START; i < WORKDAY.END; i++) workhours.push(i);

export const hoursSlotsRelation: HourSlotsIndexRelation[] = [];
for (let hour of workhours) {
    const slotsInHour: HourSlotsIndexRelation = { hour, slotIndexes: [] };
    const startIndex = SLOTS_PER_HOUR * (hour - WORKDAY.START)
    for (let slotIndex = 0; slotIndex < SLOTS_PER_HOUR; slotIndex++)
        slotsInHour.slotIndexes.push(startIndex + slotIndex);
    hoursSlotsRelation.push(slotsInHour);
}