import { SLOTS_PER_HOUR } from "~/shared/values"
import { getDoctorSchedule, getDoctorScheduleForManager } from "../api"
import { weekNumber, worktime, id, schedule, timeToSlotIndex, weekDates, whereNoSlots, slots, isWorkingTime } from "../values"
import { SlotStatus, WorkingStatus} from "../types"
import me from "~/shared/stores/User"
import { UserRoles } from "~/shared/enum"

export const updateSchedule = async () => {
    const responseData = me.data.value?.role === UserRoles.Manager ? (await getDoctorScheduleForManager(id.value, weekNumber.value)).data  : (await getDoctorSchedule({id: id.value, week_num: weekNumber.value})).data
    worktime.value = responseData?.worktime
    schedule.value = responseData?.schedule
    weekDates.value = responseData.schedule.map(sch => sch.date)
    try {
        whereNoSlots.value = [];  
        slots.value = [];

        const slotsCount = SLOTS_PER_HOUR * (worktime.value.endHours - worktime.value.startHours);
        isWorkingTime.value = new Array(7).fill(null).map(
            () => new Array(slotsCount).fill(WorkingStatus.NOT_WORKING)
        );
        
        schedule.value.forEach(day => {
            const dayAtWeek = day.dayAtWeek;
            let indexes = {
                start: timeToSlotIndex(worktime.value, day.startTime),
                end: timeToSlotIndex(worktime.value, day.endTime)
            };
            setWorkingStatus(day.dayAtWeek, indexes, WorkingStatus.AVAILABLE);

            if (day.lunch) {
                indexes = {
                    start: timeToSlotIndex(worktime.value, day.lunch.startTime),
                    end: timeToSlotIndex(worktime.value, day.lunch.endTime)
                }
                setWorkingStatus(day.dayAtWeek, indexes, WorkingStatus.UNAVAILABLE)
                slots.value.push({ status: SlotStatus.LUNCH, dayAtWeek, indexes })
            }
            
            for (let slot of day.slots) {
                const indexes = {
                    start: timeToSlotIndex(worktime.value, slot.startTime),
                    end: timeToSlotIndex(worktime.value, slot.endTime)
                };
                setWorkingStatus(day.dayAtWeek, indexes, WorkingStatus.UNAVAILABLE);

                if (slot?.mine)
                    slots.value.push({ id: slot.id, status: SlotStatus.MY_APPOINTMENT, dayAtWeek, indexes });
                else
                    slots.value.push({ id: slot.id, status: me.data.value?.role === UserRoles.Manager ? slot.status : SlotStatus.SOME_APPOINTMENT, dayAtWeek, indexes, patient: slot?.patient });
            }

            for (let [slotIndex, slotWorkingStatus] of isWorkingTime.value[dayAtWeek].entries()) {
                if (slotWorkingStatus !== WorkingStatus.UNAVAILABLE) {
                    whereNoSlots.value.push({ dayIndex: dayAtWeek, slotIndex, status: slotWorkingStatus });
                }
            }
        });
    } catch (error) {
        console.error("Failed to fetch schedule", error);
    }
};

const setWorkingStatus = (
    weekDayIndex: number,
    indexes: { start: number, end: number },
    status: WorkingStatus
) => {
    for (let slotIndex = indexes.start; slotIndex < indexes.end; slotIndex++) {
        isWorkingTime.value[weekDayIndex][slotIndex] = status;
    }
}