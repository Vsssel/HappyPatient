<template>
    <FormField 
        :formGroup="FormFields" 
        :onChange="handleFieldChange"
        v-model:values="values" 
        class="w-100"
    >
    <template #button></template>
    <template #fullname>
      <AutoComplete
          type="text"
          v-model="selectedName"
          :suggestions="filteredSuggestions"
          inputClass="w-100"
          class="w-100"
          @complete="search"
        />
    </template>
    <template #offices>
        <div class="d-flex flex-column">
            <span class="mb-2">
                {{ 'Select offices' }}
            </span>
            <MultiSelect 
                filter
                v-model="selectedOffices" 
                display="chip" 
                :options="officesOptions" 
                optionLabel="label" 
                optionValue="value"
            />
        </div>
    </template>
    <template #categories>
        <div class="d-flex flex-column">
            <span class="mb-2">
                {{ 'Select categories' }}
            </span>
            <MultiSelect 
                filter
                v-model="selectedCategories" 
                display="chip" 
                :options="categoriesOption" 
                optionLabel="label" 
                optionValue="value"
            />
        </div>
      </template>
    </FormField>
</template>
<script setup lang="ts">
import type { FormGroup } from '~/shared/components/form/types'
import type { DoctorsSearchResourcesResponse } from '../../types'
import { categoriesToOption, officesToOption, getDoctorsSuggestions } from '../../utils'
import { defineProps } from 'vue'
import FormField from '~/shared/components/form/FormField.vue'
import { values } from '../../values'
import AutoComplete from 'primevue/autocomplete'

const props = defineProps<{ data: DoctorsSearchResourcesResponse }>();

const selectedOffices = ref<any[]>()
const selectedCategories = ref<number[]>()
const officesOptions = ref<{ label: string, value: number }[]>([]);
const resources = ref<DoctorsSearchResourcesResponse | null>(null);
const categoriesOption = ref<{ label: string, value: number }[]>([]);
const doctorsOption = ref<string[]>([])
const filteredSuggestions = ref<any[]>([])
const selectedName = ref(undefined)


const FormFields = ref<FormGroup[]>([
  {
    class: 'row w-100',
    fields: [
      {
        name: 'fullname',
        type: 'slot',
        class: 'col-4',
        label: { text: 'Search doctor by name' }
      },
      {
        name: 'categories',
        type: 'slot',
        class: 'col-4',
      },
      {
        name: 'offices',
        type: 'slot',
        class: 'col-4',
      }
    ]
  }
])

const handleFieldChange = (submittedValues: Record<string, any>) => {
  console.log('changed', values.value)
  values.value = {
    ...values.value,
    fullname: submittedValues.fullname,
    categories: selectedCategories.value,
    offices: selectedOffices.value,
  }
}

onMounted(async () => {
    resources.value = props.data
    officesOptions.value = officesToOption(resources.value?.offices || [])
    categoriesOption.value =  categoriesToOption(resources.value?.categories || [])
    doctorsOption.value = getDoctorsSuggestions(resources.value?.doctors || [])
})

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

watch(selectedOffices, () => {
  values.value = {
    ...values.value,
    offices: selectedOffices.value,
  };
});

watch(selectedCategories, () => {
  values.value = {
    ...values.value,
    categories: selectedCategories.value,
  };
});

watch(selectedName, () => {
  values.value = {
    ...values.value,
    fullname: selectedName.value,
  };
})

</script>