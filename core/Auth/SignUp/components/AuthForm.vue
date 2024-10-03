<template>
    <FormField 
        :formFields="firstFormField"
        v-model:values="values" 
        :submit="onSubmit"
    >
        <template #button>
            <button class="btn btn-primary px-3">Next</button>
        </template>
        <template #email>
          <label class="form-label d-flex">
            Email: 
            <i style="font-size: 8px; color: red; margin-left: 4px;" class="bi-asterisk" />
          </label>
          <input type="text" v-model="typedEmail" class="form-control">
          <label v-if="!errorEmail" class="form-label text-danger">{{ !typedEmail ? 'This field is required' : 'Invalid email'}}</label>
        </template>
    </FormField>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import FormField from '~/shared/components/form/FormField.vue'
import type { PostPatientAuthRequest } from '../types'
import { name, surname, formNumber } from '../values'

const typedEmail = ref<string>('')
const errorEmail = ref<boolean>(false)

const values = ref<PostPatientAuthRequest>({
    email: ''
})
const firstFormField = [
  {
    name: 'name',
    type: 'text',
    required: true,
    label: { text: 'Name: ' },
    value: name.value,
    placeholder: 'Enter your first name',
    class: 'w-100',
  },
  {
    name: 'surname',
    type: 'text',
    required: true,
    label: { text: 'Surname: ' },
    value: surname.value,
    placeholder: 'Enter your surname',
    class: 'w-100',
  },
  {
    name: 'email',
    type: 'slot',
    class: 'w-100',
  },
]

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const onSubmit = async(fieldValues: Record<string, any>) => {
  errorEmail.value = isValidEmail(typedEmail.value) && typedEmail.value.length > 0
  values.value = {
      email: typedEmail.value
  }
  name.value = fieldValues.name
  surname.value = fieldValues.surname
  errorEmail.value && (formNumber.value = 2)
}
</script>