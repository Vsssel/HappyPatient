<template>
  <div class="w-100 d-flex justify-content-center">
    <div class="col-8 d-flex flex-column align-items-end p-3">
      <div class="card w-50 border-2 p-1 d-flex flex-row mb-3">
        <span class="col-1 d-flex align-items-center justify-content-center">
          <i style="font-size: 1rem;" class="pi pi-search"></i>
        </span>
        <AutoComplete
          type="text"
          v-model="values.fullname"
          :suggestions="filteredSuggestions"
          inputClass="w-100 border-0 bg-white text-dark no-focus-outline"
          class="col-10"
          @complete="search($event)"
        />
        <span class="col-1 d-flex align-items-center justify-content-center">
          <i style="cursor: pointer; font-size: 1rem;" @click="toggleFilter" class="bi bi-sliders"></i>
        </span>
      </div>
      <div v-if="isVisible" class="card p-2 position-absolute" style="top: 9%; width: 32.5%; z-index: 999;">
      <FormField :formGroup="FormFields" :submit="onSubmit" v-model:values="values" class="w-100">
        <template #button>
          <button class="btn btn-primary align-self-end m-3">Search</button>
        </template>
        <template #offices>
          <div class="d-flex flex-column">
            <span class="mb-2">Select offices</span>
            <MultiSelect v-model="selectedOffices" display="chip" :options="options" optionLabel="label" optionValue="value"></MultiSelect>
          </div>
        </template>
      </FormField>
      </div>
    </div>
    <div class="col-4 p-3 d-flex justify-content-between align-items-center">
      <nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb" class="w-75">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/appointment" class="text-decoration-none text-dark">Appointment</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <NuxtLink to="/dashboard" class="text-decoration-none text-dark">Dashboard</NuxtLink>
          </li>
        </ol>
      </nav>
      <div class="d-flex w-25 justify-content-center">
        <i style="cursor: pointer;" class="bi bi-person-circle fs-2 mb-3 text-secondary"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';
import { ref } from 'vue'
import type { FormGroup } from '../form/types';
import FormField from '../form/FormField.vue';
import MultiSelect from 'primevue/multiselect';

const suggestions = ['assel', 'medat']
const isVisible = ref<boolean>(false)
const filteredSuggestions = ref()
const selectedOffices = ref([])

const values = ref({
  fullname: '',
  category: '',
  min_exp_years: -1,
  max_exp_years: -1,
  offices: [],
  sort_by: '',
  asc_order: true
})

const options = ref([
  {
    label: 'assel',
    value: 'assel'
  },
  {
    label: 'medat',
    value: 'medat'
  }
])

const FormFields: FormGroup[] = [
  {
    class: 'row w-100',
    fields: [
      {
        name: 'category',
        type: 'select',
        value: values.value.category,
        options: options.value,
        label: { text: 'Select doctor category' },
        class: 'col-6'
      },
      {
        name: 'offices',
        type: 'slot',
        class: 'col-6'
      }
    ]
  },
  {
    class: 'row w-100',
    fields: [
      {
        name: 'min_exp_years',
        type: 'number',
        value: values.value.min_exp_years === -1 ? 0 : values.value.min_exp_years,
        label: { text: 'Minim experience in years' },
        class: 'col-6'
      },
      {
        name: 'max_exp_years',
        type: 'number',
        value: values.value.max_exp_years === -1 ? 1 : values.value.max_exp_years,
        label: { text: 'Maximum experience in years' },
        class: 'col-6'
      }
    ]
  }
]

const toggleFilter = () => {
  isVisible.value = !isVisible.value
}

const onSubmit = (values: Record<string, any>) => {
  console.log(selectedOffices.value)
  console.log('Form Submitted:', values);
};

const search = (event: any) => {
  if (!event.query.trim().length) {
    filteredSuggestions.value = [...suggestions];
  } else {
    filteredSuggestions.value = suggestions.filter((item) =>
      String(item).toLowerCase().startsWith(event.query.toLowerCase())
    );
  }
};
</script>

<style scoped>
.no-focus-outline:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
</style>
