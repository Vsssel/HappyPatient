<template>
  <div>
    <NuxtLink to="/appointment">Appointment</NuxtLink>
    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
    <NuxtLink to="/accounts/login">Login</NuxtLink>
    <NuxtLink to="/accounts/registration">Registration</NuxtLink>
  </div>
  <div class="w-100 h-100 d-flex align-items-center justify-content-center">
    <div class="w-25">
      <FormField :fields-column="fields" :submit="onSubmit" v-model:fieldsValues="formValues" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormField from '~/shared/components/form/FormField.vue';
import type { FormFields } from '~/shared/components/form/types';

const values = ref({
  name: '',
  age: '',
  selectedFruit: ''
});

const fruitOptions = ref([
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' }
]);

const fields: FormFields = [
  {
    name: 'name',
    type: 'text',
    text: 'Name',
    value: values.value.name,
    placeholder: 'Enter your name',
    icon: 'pi pi-user',
    class: 'col-12',
    required: true
  },
  {
    name: 'age',
    type: 'number',
    text: 'Age',
    value: values.value.age,
    placeholder: 'Enter your age',
    class: 'col-12',
    required: true
  },
  {
    name: 'favourite_fruit',
    type: 'select',
    text: 'Favorite Fruit',
    value: values.value.selectedFruit,
    placeholder: 'Select a fruit',
    options: fruitOptions.value,
    class: 'col-12',
    required: true
  }
];

// Holds the form values
const formValues = ref({});

// Handle form submission
const onSubmit = (fieldValues: Record<string, any>) => {
  console.log(fieldValues, 'Form Submitted'); // Logs only the values, not the entire fields array
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