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
  fruite: null,
  password: null,
  date: null,
  time: null,
  editor: null
});

const fruitOptions = ref([
  { label: 'Not selected', value: null},
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' }
]);

const fields: FormFields[] = [
  {
    name: 'name',
    type: 'text',
    required: true,
    label: {
      text: 'Name: '
    },
    value: values.value.name,
    placeholder: 'Enter your name',
    icon: 'pi pi-user',
    class: 'col-12',
  },
  {
    name: 'fruite',
    type: 'select',
    required: true,
    label: {
      text: 'Select Fruite'
    },
    value: values.value.fruite,
    placeholder: 'Select you favourite fruite',
    options: fruitOptions.value,
    class: 'col-12'
  },
  {
    name: 'password',
    type: 'password',
    feedback: true,
    required: true,
    label: {
      text: 'Password:'
    },
    value: values.value.password,
    placeholder: 'Enter password',
    class: 'col-12'
  },
  {
    name: 'date',
    type: 'date',
    required: true,
    value: values.value.date,
    minDate: new Date(),
    maxDate: new Date('2024/12/31'),
    showButtonBar: true,
    label: {
      text: 'Select date'
    },
    showIcon: true,
    iconDisplay: 'input',
    dateFormat: 'dd/mm/yy',
    class: 'col-12'
  },
  {
    name: 'date',
    type: 'date',
    required: true,
    value: values.value.time,
    label: {
      text: 'Select time'
    },
    showIcon: true,
    timeOnly: true,
    iconDisplay: 'input',
    dateFormat: 'dd/mm/yy',
    class: 'col-12'
  },
  // {
  //   name: 'filled',
  //   type: 'editor',
  //   required: true,
  //   value: values.value.editor,
  //   label: {
  //     text: 'Edit'
  //   },
  //   style: "width: 100%;"
  // }
]


const formValues = ref({});


const onSubmit = (fieldValues: Record<string, any>) => {
  console.log(fieldValues, 'Form Submitted')
};
</script>
