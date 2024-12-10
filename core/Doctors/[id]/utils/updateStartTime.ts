import { values, isUpdating } from "../values"
import { calculateEndTime } from "./calculateEndTime"

export const updateStartTime = () => {
  if (!isUpdating.value && values.value.startsAt) {
    isUpdating.value = true
    values.value.endsAt = calculateEndTime(values.value.startsAt, values.value.typeId)
    isUpdating.value = false
  }
}