import { nextTick } from "vue"
import { form, values } from "../values"

export const updateForm = () => {
  form.value[1].value = values.value.title
  form.value[2].value = values.value.content

  nextTick(() => {
    form.value[1].value = values.value.title
    form.value[2].value = values.value.content
  })
}