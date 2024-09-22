<template>
  <div>
    <NuxtLink to="/appointment">Appointment</NuxtLink>
    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
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
  name: null,
  age: null,
  selectedFruit: null
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
  }
];

// Holds the form values
const formValues = ref({});

// Handle form submission
const onSubmit = (fieldValues: Record<string, any>) => {
  console.log(fieldValues, 'Form Submitted'); // Logs only the values, not the entire fields array
};
</script>
