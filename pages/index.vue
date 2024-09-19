<template>
    <div>
    <NuxtLink to="/appointment">Appointment</NuxtLink>
    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
  </div>
  <div class="w-100 h-100 d-flex align-items-center justify-content-center">
    <div class="w-25">
      <FormField :fields-column="fields" :submit="onSubmit"/>
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
})
const fruitOptions = ref([
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' }
    ])

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
    options: fruitOptions,
    class: 'col-12',
    required: true
  }
];

const onSubmit = () => {
  console.log(values.value, 'values')
}
</script>
