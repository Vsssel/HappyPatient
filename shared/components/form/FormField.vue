<template>
    <form 
      @submit.prevent="onSubmit"
      :class="props.fieldsColumn ? 'd-flex flex-column w-100' : 'd-flex flex-row w-100 justify-content-between'"
    >
      <div v-for="(field, index) in fields" :key="index">
        <label v-if="field.text">{{ field.text }}</label>
        <div>
          <div v-if="field.type === 'text'">
            <IconField>
              <InputIcon v-if="field.icon" :class="field.icon" />
              <InputText
                v-model="field.value"
                :placeholder="field.placeholder"
                :class="field.class"
            />
            </IconField>
          </div>
          <div v-if="field.type === 'number'">
            <IconField>
              <InputIcon v-if="field.icon" :class="field.icon" />
              <InputNumber
                v-model="field.value"
                :placeholder="field.placeholder"
                :class="field.class"
              />
            </IconField>
          </div>
          <div v-if="field.type === 'dropdown'">
            <IconField>
              <InputIcon v-if="field.icon" :class="field.icon" />
              <Dropdown
                v-model="field.value"
                :options="field.options"
                :placeholder="field.placeholder"
                :class="field.class"
              />
            </IconField>
          </div>
          <div v-if="field.type === 'autocomplete'">
            <IconField>
              <InputIcon v-if="field.icon" :class="field.icon" />
              <AutoComplete
                v-model="field.value"
                :suggestions="field.suggestions"
                :placeholder="field.placeholder"
                @complete="field.search"
                :class="field.class"
              />
            </IconField>
          </div>
          <!-- Add more components as needed -->
        </div>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  import Dropdown from 'primevue/dropdown';
  import AutoComplete from 'primevue/autocomplete';
  import type { FormFields } from './types';
  
  const props = defineProps<{
    fieldsRow?: FormFields;
    fieldsColumn?: FormFields;
  }>();

  const fields = props.fieldsRow ? props.fieldsRow : props.fieldsColumn
  
  const onSubmit = () => {
    // Handle form submission logic here
  };
  </script>