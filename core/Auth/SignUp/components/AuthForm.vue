<template>
  <FormField 
      :formFields="firstFormField"
      v-model:values="values" 
      :submit="onSubmit"
  >
    <template #button>
       <button class="btn btn-primary px-3">Next</button>
    </template>
    <template #error="{ field }">
      <label v-if="field.name === 'email' && !errorEmail && validated" class="form-label text-danger">
        {{ 'Invalid email' }}
      </label>
    </template>
 </FormField>
 <ToasT />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import FormField from '~/shared/components/form/FormField.vue'
import type { PostPatientAuthRequest } from '../types'
import { name, surname, formNumber } from '../values'
import { postPatientAuth } from '../api/postPatientAuth'
import Toast from 'primevue/toast'

const errorEmail = ref<boolean>(false)
const validated = ref(false);
const toast = useToast()

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
    type: 'text',
    required: true,
    label: { text: 'Email: ' },
    value: values.value.email,
    placeholder: 'Enter your email',
    class: 'w-100',
  }
]

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


const onSubmit = async (fieldValues: Record<string, any>) => {
  validated.value = true;
  errorEmail.value = isValidEmail(fieldValues.email)
  if (!errorEmail.value) {
    return; 
  }
  name.value = fieldValues.name;
  surname.value = fieldValues.surname;
  if (errorEmail.value) {
    values.value.email = fieldValues.email
    const response = await postPatientAuth(values.value)
    console.log(response)
    if(response.status < 400){
      formNumber.value = 2;
    }
    else{
        toast.add({ severity: 'error', summary: 'Something went wrong', life: 3000 })
    }
  }
}
</script>
