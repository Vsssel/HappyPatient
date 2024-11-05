import { values, resource, totalPrice, errorStart, appointment } from "../values"
import { updateStartTime } from "./updateStartTime"
import { updateEndTime } from "./updateEndTime"
import { getMyAppointmentResources } from "../api"

export const onHandleChange = async(fieldValues: Record<string, any>) => {
    if (fieldValues.typeId !== values.value.typeId) {
        values.value.typeId = fieldValues.typeId
        resource.value = (await getMyAppointmentResources(appointment.value.doctor.id, `${values.value.date.toLocaleDateString("en-GB").replace(/\//g, ".")}` , { except_slot_id: appointment.value?.id, duration: values.value.typeId === 1 ? 30 : 60 })).data
        resource.value?.priceList?.forEach(price => { price.typeId === values.value.typeId  ? totalPrice.value = price.price : 10000 })
        updateStartTime();
    }

    if (fieldValues.date.toString() !== values.value.date.toString()) {
        console.log(fieldValues.date, values.value.date)
        values.value.date = fieldValues.date;
        resource.value = (await getMyAppointmentResources(appointment.value.doctor.id, `${values.value.date.toLocaleDateString("en-GB").replace(/\//g, ".")}` , { except_slot_id: appointment.value?.id, duration: values.value.typeId === 1 ? 30 : 60 })).data
    }

    if (fieldValues.startsAt !== values.value.startsAt) {
        values.value.startsAt = fieldValues.startsAt
        const startToString = values.value.startsAt.toLocaleTimeString("en-GB")
        const matchingSlot = resource.value?.freeSlots.some(slot => slot.startTime === startToString)
        errorStart.value = matchingSlot ? '' : 'Start time out of free slots'
        updateEndTime();
       
    } 

    else if (fieldValues.endsAt !== values.value.endsAt) {
        values.value.endsAt = fieldValues.endsAt;
        updateStartTime();
    }
}