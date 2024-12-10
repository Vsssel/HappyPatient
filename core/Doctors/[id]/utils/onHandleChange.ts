import { values } from "../values"
import { updateStartTime, updateEndTime, updateForm } from "."

export const onHandleChange = (fieldValues: Record<string, any>) => {
  if (fieldValues.date !== values.value.date) {
    values.value.date = fieldValues.date
  }

  if (fieldValues.startsAt !== values.value.startsAt) {
    values.value.startsAt = fieldValues.startsAt
    updateStartTime()
  } else if (fieldValues.endsAt !== values.value.endsAt) {
    values.value.endsAt = fieldValues.endsAt
    updateEndTime()
  }

  updateForm()
}
