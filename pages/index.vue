<template>
  <div>
    <NuxtLink to="/appointment">Appointment</NuxtLink>
    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
  </div>
  <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
    <div class="w-25">
      <FormField :formFields="fields" :submit="onSubmit" v-model:fieldsValues="formValues">
        <template #check="{field}">
          <Checkbox v-model="formValues.toggle" :binary="true" />
        </template>
      </FormField>
      <FormField :formGroup="formGroup" :submit="onSubmit" v-model:fieldsValues="formValues" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormField from '~/shared/components/form/FormField.vue';
import type { FormFields, FormGroup } from '~/shared/components/form/types';
import Checkbox from 'primevue/checkbox';

const formValues = ref({
  name: '',
  fruit: '',
  password: '',
  date: null,
  time: null,
  searched: '',
  textarea: '',
  toggle: false
});

const suggestions = ['Apple', 'Banana', 'Cherry'];

const fruitOptions = ref([
  { label: 'Not selected', value: null },
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' }
]);

const fields: FormFields[] = [
  {
    name: 'name',
    type: 'text',
    required: true,
    label: { text: 'Name: ' },
    value: formValues.value.name,
    placeholder: 'Enter your name',
    icon: 'pi pi-user',
    class: 'col-12',
  },
  {
    name: 'fruit',
    type: 'select',
    required: true,
    label: { text: 'Select Fruit' },
    value: formValues.value.fruit,
    placeholder: 'Select your favorite fruit',
    options: fruitOptions.value,
    class: 'col-12'
  },
  {
    name: 'password',
    type: 'password',
    feedback: true,
    required: true,
    label: { text: 'Password:' },
    value: formValues.value.password,
    placeholder: 'Enter password',
    class: 'col-12'
  },
  {
    name: 'date',
    type: 'date',
    required: true,
    value: formValues.value.date,
    minDate: new Date(),
    maxDate: new Date('2024/12/31'),
    showButtonBar: true,
    label: { text: 'Select date' },
    showIcon: true,
    iconDisplay: 'input',
    dateFormat: 'dd/mm/yy',
    class: 'col-12'
  },
  {
    name: 'check',
    type: 'slot'
  }
];

const formGroup: FormGroup[] = [
  {
    class: 'd-flex',
    fields: [
      {
        name: 'time',
        type: 'date',
        required: true,
        value: formValues.value.time,
        label: { text: 'Select time' },
        showIcon: true,
        timeOnly: true,
        iconDisplay: 'input',
        dateFormat: 'dd/mm/yy',
        class: 'col-6'
      },
      {
        name: 'searched',
        type: 'autocomplete',
        required: false,
        value: formValues.value.searched,
        label: { text: 'Search' },
        suggestions: suggestions,
        class: 'col-6',
        placeholder: 'search'
      }
    ]
  }
]

const onSubmit = (fieldValues: Record<string, any>) => {
  console.log('Form Submitted:', fieldValues);
};
</script>

<style>
:root {
  --p-primary-50: var(--p-blue-50);
  --p-primary-100: var(--p-blue-100);
  --p-primary-200: var(--p-blue-200);
  --p-primary-300: var(--p-blue-300);
  --p-primary-400: var(--p-blue-400);
  --p-primary-500: var(--p-blue-500);
  --p-primary-600: var(--p-blue-600);
  --p-primary-700: var(--p-blue-700);
  --p-primary-800: var(--p-blue-800);
  --p-primary-900: var(--p-blue-900);
  --p-primary-950: var(--p-blue-950);
}
</style>