import { isUpdating, values } from "../values"
import { calculateStartTime } from "./calculateStartTime"

export const updateEndTime = () => {
  if (!isUpdating.value && values.value.endsAt) {
    isUpdating.value = true
    values.value.startsAt = calculateStartTime(values.value.endsAt, values.value.typeId)
    isUpdating.value = false
  }
};