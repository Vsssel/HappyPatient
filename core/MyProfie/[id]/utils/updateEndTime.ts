import { isUpdating, values } from "../values"
import { updateForm } from "./updateForm"
import { errorEnd } from "../values"
import { resource } from "../values"

export const updateEndTime = () => {
    if (!isUpdating.value && values.value.startsAt) {
        isUpdating.value = true
        values.value.endsAt = calculateEndTime(new Date(values.value.startsAt), values.value.typeId)
        isUpdating.value = false
        updateForm()
    }
}

const calculateEndTime = (startTime: Date, typeId: number): Date => {
    if (!startTime) return new Date()
    const duration = typeId === 1 ? 30 : 60
    return new Date(startTime.getTime() + duration * 60 * 1000)
}
