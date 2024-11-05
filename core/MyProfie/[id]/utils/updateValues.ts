import { appointment, resource, values, isFuture, totalPrice } from "../values"
import { updateForm } from "./updateForm";

export const updateValues = () => {
    const [day, month, year] = appointment.value?.date.split('.').map(Number);
    const [startHour, startMinute] = appointment.value?.startTime.split(':').map(Number);
    const [endHour, endMinute] = appointment.value?.endTime.split(':').map(Number);
    resource.value.priceList?.forEach(price => { price.typeId === appointment.value?.type.id  ? totalPrice.value = price.price : 0 })

    isFuture.value = new Date(year, month-1, day, startHour, startMinute) > new Date()
    values.value = {
        typeId: appointment.value?.type.id,
        date: new Date(year, month - 1, day),
        startsAt: new Date(year, month - 1, day, startHour, startMinute, 0),
        endsAt: new Date(year, month - 1, day, endHour, endMinute, 0)
    }
    updateForm()
}