import { isUpdating, values } from "../values";
import { updateForm } from "./updateForm";
import { resource } from "../values";
import { errorStart } from "../values";

export const updateStartTime = () => {
    if (!isUpdating.value && values.value.endsAt) {
        isUpdating.value = true
        values.value.startsAt = calculateStartTime(new Date(values.value.endsAt), values.value.typeId)
        isUpdating.value = false
        updateForm()
    }
}

const calculateStartTime = (endTime: Date, typeId: number): Date => {
    if (!endTime) return new Date()
    const duration = typeId === 1 ? 30 : 60
    return new Date(endTime.getTime() - duration * 60 * 1000)
}
