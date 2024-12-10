import { formForAppointment, values } from "../values"

export const updateForm = () => {
  formForAppointment.value.forEach(form => {
    form.fields.forEach(form => {
      form.value = values.value[form.name]
    })
  })


  nextTick(() => {
    formForAppointment.value.forEach(form => {
    form.fields.forEach(form => {
      form.value = values.value[form.name]
    })
  })

  })
}