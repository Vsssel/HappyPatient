<template>
  <FormField 
      :formGroup="firstFormField"
      v-model:values="values" 
      :submit="onSubmit"
  >
    <template #button>
      <button 
        :class="['btn btn-primary px-3', load ? 'disabled' : '']">
          <i v-if="load" class="pi pi-spin pi-spinner" style="font-size: 1rem" />
          Next
      </button>
    </template>
    <template #error="{ field }">
      <label v-if="field.name === 'email' && errorEmail && validated" class="form-label text-danger">
        {{ errorEmail }}
      </label>
      <label v-if="field.name === 'iin' && !errorIIN && validated" class="form-label text-danger">
        {{ 'Invalid IIN' }}
      </label>
      <label 
        v-if="validationErrors" 
        v-for="validationError in getErrorsForField(field.name)" 
        :key="validationError.detail"
        class="form-label text-danger"
      >
        {{ validationError.detail }}
      </label>
    </template>
 </FormField>
 <ToasT />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import FormField from '~/shared/components/form/FormField.vue'
import type { PostPatientAuthRequest } from '../types'
import { name, surname, formNumber, iin, email } from '../values'
import { postPatientAuth } from '../api/postPatientAuth'
import { useToast } from 'primevue/usetoast'
import type { FormGroup } from '~/shared/components/form/types'

const errorEmail = ref<string | null>(null) 
const errorIIN = ref<boolean>(false)
const validated = ref(false);
const toast = useToast()
const load = ref<boolean>(false)
const validationErrors = ref<{detail: string; location: string}[]>()

const firstFormField = ref<FormGroup[]>([
  {
    class: 'w-100 row',
    fields: [
        {
        name: 'name',
        type: 'text',
        required: true,
        label: { text: 'Name: ' },
        value: name.value,
        placeholder: 'John',
        class: 'col-6 ps-0',
      },
      {
        name: 'surname',
        type: 'text',
        required: true,
        label: { text: 'Surname: ' },
        value: surname.value,
        placeholder: 'Doe',
        class: 'col-6 pe-0',
      },
    ]
  },
  {
    class: 'column w-100',
    fields: [
        {
        name: 'iin',
        type: 'text',
        required: true,
        label: { text: 'IIN: ' },
        value: iin.value,
        placeholder: '999999999999',
        class: 'col-12',
      },
      {
        name: 'email',
        type: 'text',
        required: true,
        label: { text: 'Email: ' },
        value: email.value,
        placeholder: 'example@mail.com',
        class: 'col-12',
      }
    ]
  }
])

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email);
}

const isValidIIN = (iin: string): boolean => {
  const iinRegex = /^\d+$/
  return (iin.length === 12 && iinRegex.test(iin))
}

const getErrorsForField = (fieldName: string) => {
  return validationErrors.value ? validationErrors.value.filter(error => error.location === fieldName) : [];
}

const onSubmit = async (fieldValues: Record<string, any>) => {
  validated.value = true;
  errorEmail.value = isValidEmail(fieldValues.email) ? null : 'Invalid email format'
  errorIIN.value = isValidIIN(fieldValues.iin);

  if (errorEmail.value || !errorIIN.value) {
    return
  }

  name.value = fieldValues.name;
  surname.value = fieldValues.surname;
  iin.value = fieldValues.iin;
  email.value = fieldValues.email;

  if (!errorEmail.value) {
    const values = {
      email: fieldValues.email,
      iin: fieldValues.iin
    }
    load.value = true;

    try {
      const response = await postPatientAuth(values);

      if (response.status < 400 && response.status !== 409) {
        formNumber.value = 2;
        toast.add({ severity: 'success', summary: "Email verification code sent to your email", life: 3000 });
      } else if (response.status === 409) {
        validationErrors.value = response.message
      } else {
        toast.add({ severity: 'error', summary: response.message, life: 3000 });
      }
    } catch (error) {
      toast.add({ severity: 'error', summary: 'An error occurred', life: 3000 });
    }
    finally{
      load.value = false
    }
  }
}
</script>
