<template>
    <div>
    <NuxtLink to="/appointment">Appointment</NuxtLink>
    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
  </div>
  <div class="w-100 h-100 d-flex align-items-center justify-content-center">
    <div class="w-50">
      <FormField :fields-column="fields" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormField from '~/shared/components/form/FormField.vue'; // Adjust import path as needed
import type { FormFields } from '~/shared/components/form/types';

const suggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'];
const name = ref()
const age = ref()
const fruit = ref()
const searchedFruit = ref()
const fruitOptions = ref([
      { name: 'Apple', code: 'apple' },
      { name: 'Banana', code: 'banana' },
      { name: 'Cherry', code: 'cherry' }
    ])

const fields: FormFields = [
  {
    type: 'text',
    text: 'Name',
    value: name.value,
    placeholder: 'Enter your name',
    icon: 'pi pi-user',
    class: 'w-25'
  },
  {
    type: 'number',
    text: 'Age',
    value: age.value,
    placeholder: 'Enter your age',
    icon: 'pi pi-calendar',
    class: 'col-3'
  },
  {
    type: 'dropdown',
    text: 'Favorite Fruit',
    value: fruit.value,
    placeholder: 'Select a fruit',
    options: fruitOptions.value,
    icon: 'pi pi-caret-down',
    class: 'col-3'
  },
  {
    type: 'autocomplete',
    text: 'Search Fruit',
    value: searchedFruit.value,
    suggestions: suggestions,
    placeholder: 'Start typing to search...',
    class: 'col-3',
    search: (event) => {
      // Handle search logic here
    }
  }
];
</script>
