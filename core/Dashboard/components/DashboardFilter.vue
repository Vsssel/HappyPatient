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
          @keydown.enter.prevent="handleKeyPress"
          inputClass="w-100 border-0 bg-white text-dark no-focus-outline"
          class="col-10"
          @complete="search"
        />
        <span class="col-1 d-flex align-items-center justify-content-center">
          <i style="cursor: pointer; font-size: 1rem;" @click="toggleFilter" class="bi bi-sliders"></i>
        </span>
      </div>
      <div v-if="isVisible" class="card p-2 position-absolute" style="top: 75px; width: 500px; z-index: 999;">
        <FormField :formGroup="FormFields" :submit="onSubmit"  v-model:values="values" class="w-100">
          <template #button>
            <button class="btn btn-primary align-self-end m-3">Search</button>
          </template>
          <template #offices>
            <div class="d-flex flex-column">
              <span class="mb-2">Select offices</span>
              <MultiSelect v-model="selectedOffices" display="chip" :options="officesOptions" optionLabel="label" optionValue="value"></MultiSelect>
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
import { ref, onMounted } from 'vue'
import type { FormGroup } from '~/shared/components/form/types';
import FormField from '~/shared/components/form/FormField.vue';
import MultiSelect from 'primevue/multiselect';
import type { DoctorsSearchResourcesResponse } from '../types';
import { getDoctors, getDoctorsResourses } from '../api';
import { categoriesToOption, getDoctorsSuggestions, officesToOption } from '../utils';
import { doctors } from '../values';

const isVisible = ref<boolean>(false);
const filteredSuggestions = ref<any[]>([]);
const selectedOffices = ref<any[]>([]);
const officesOptions = ref<{ label: string, value: string }[]>([]);
const resources = ref<DoctorsSearchResourcesResponse | null>(null);
const categoriesOption = ref<{ label: string, value: string }[]>([]);


const values = ref({
  fullname: '',
  category: '',
  min_exp_years: -1,
  max_exp_years: -1,
  offices: [],
  sort_by: '',
  asc_order: true,
});

const FormFields: FormGroup[] = [
  {
    class: 'row w-100',
    fields: [
      {
        name: 'category',
        type: 'select',
        label: { text: 'Select doctor category' },
        value: values.value.category,
        options: categoriesOption.value,
        class: 'col-6',
      },
      {
        name: 'offices',
        type: 'slot',
        class: 'col-6',
      },
    ],
  },
  {
    class: 'row w-100',
    fields: [
      {
        name: 'min_exp_years',
        type: 'number',
        value: values.value.min_exp_years === -1 ? null : values.value.min_exp_years,
        label: { text: 'Minimum experience in years' },
        class: 'col-6',
      },
      {
        name: 'max_exp_years',
        type: 'number',
        value: values.value.max_exp_years === -1 ? null : values.value.max_exp_years,
        label: { text: 'Maximum experience in years' },
        class: 'col-6',
      },
    ],
  },
];

const toggleFilter = () => {
  isVisible.value = !isVisible.value;
};

const onSubmit = async(submittedValues: Record<string, any>) => {
  console.log(selectedOffices.value);
  console.log('Form Submitted:', submittedValues);
  values.value = {
    fullname: submittedValues.fullname,
    category: submittedValues.categories,
    min_exp_years: submittedValues.min_exp_years === -1 ? undefined : submittedValues.min_exp_years,
    max_exp_years: submittedValues.max_exp_years === -1 ? undefined : submittedValues.max_exp_years,
    offices: selectedOffices.value,
    sort_by: 'min_exp_years',
    asc_order: true,
  }
  console.log(values.value)
   doctors.value = (await getDoctors(values.value)).data
}

const search = (event: any) => {
  const doctorsOption = getDoctorsSuggestions(resources.value?.doctors || [])
  if (!event.query.trim().length) {
    filteredSuggestions.value = doctorsOption
  } else {
    filteredSuggestions.value = doctorsOption.filter((doctor) =>
      doctor.toLowerCase().startsWith(event.query.toLowerCase())
    );
  }
}

const handleKeyPress = (event: KeyboardEvent) => {
  onSubmit(values.value)
}


onMounted(async () => {
  const data = (await getDoctorsResourses({ doctors: true, categories: true, offices: true })).data;
  if (data) {
    resources.value = data;
    officesOptions.value = officesToOption(resources.value?.offices || []);
    categoriesOption.value =  categoriesToOption(resources.value?.categories || [])
    console.log(categoriesOption.value)
  }
})


watchEffect(() => {
  if (categoriesOption.value) {
    FormFields[0].fields[0].options = categoriesOption.value;
  }
})
</script>

<style scoped>
.no-focus-outline:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
</style>
