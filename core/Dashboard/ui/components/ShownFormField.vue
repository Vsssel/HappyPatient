<template>
    <FormField 
        :formFields="FormFields" 
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
            <span class="mb-2" style="font-size: 15px;">
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
            <span class="mb-2" style="font-size: 15px;">
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
      <template #min_exp_years>
          <InputNumber 
            v-model="minExp"
            class="w-100"
          />
        </template>
        <template #sort_by>
            <label class="form-label" style="font-size: 15px;">Sort by</label>
            <div class="d-flex flex-column gap-2">
                <div class="d-flex gap-1 align-items-center">
                    <RadioButton 
                        v-model="selectedSortBy" 
                        inputId="ingredient1" value="name" 
                    />
                    <label 
                        for="ingredient1" 
                        class="ml-2"
                        style="font-size: 13px;"
                    >
                        {{ 'Name' }}
                    </label>
                </div>
                <div class="d-flex gap-1 align-items-center">
                    <RadioButton 
                        v-model="selectedSortBy" 
                        inputId="ingredient3" 
                        value="experience" 
                    />
                    <label 
                        for="ingredient3" 
                        class="ml-2"
                        style="font-size: 13px;"
                    >
                        {{ 'Experience' }}
                    </label>
                </div>
                <div class="d-flex gap-1 align-items-center">
                    <RadioButton 
                        v-model="selectedSortBy" 
                        inputId="ingredient4" 
                        value="category" 
                    />
                    <label 
                        for="ingredient4" 
                        class="ml-2"
                        style="font-size: 13px;"
                    >
                        {{ 'Category' }}
                    </label>
                </div>
            </div>
        </template>
        <template #asc_order>
            <div class="d-flex w-100 justify-content-center p-2">
                <ToggleButton 
                    v-model="checked" 
                    onLabel="Ascending" 
                    offLabel="Descending" 
                    onIcon="pi pi-arrow-up" 
                    offIcon="pi pi-arrow-down" 
                    style="font-size: 13px;"
                />
            </div>
        </template>
    </FormField>
</template>
<script setup lang="ts">
import type { FormFields } from '~/shared/components/form/types'
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
const checked = ref<boolean>(true)
const selectedSortBy = ref(undefined)
const minExp = ref(undefined)

const FormFields = ref<FormFields[]>([
      {
        name: 'fullname',
        type: 'slot',
        class: 'col-12 mt-2 mb-2',
        label: { 
          text: 'Search doctor by name' ,
          style: 'font-size: 15px;'
        }
      },
      {
        name: 'categories',
        type: 'slot',
        class: 'col-12 mt-2 mb-2',
      },
      {
        name: 'offices',
        type: 'slot',
        class: 'col-12 mt-2 mb-2',
      },
      {
        name: 'min_exp_years',
        type: 'slot',
        label: { 
          text: 'Minimum experience in years',
          style: 'font-size: 15px;'
        },
        class: 'col-12 mt-2 mb-2',
      },
      {
        name: 'sort_by',
        type: 'slot',
        class: 'col-12 mt-2 mb-2',
      },
      {
        name: 'asc_order',
        type: 'slot',
        class: 'col-12 mt-2 mb-2',
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

watch(minExp, () => {
  values.value = {
    ...values.value,
    min_exp_years: minExp.value
  }
})

watch(selectedSortBy, () => {
  values.value = {
    ...values.value,
    sort_by: selectedSortBy.value,
  }
})

watch(checked, () => {
  values.value = {
    ...values.value,
    asc_order: checked.value,
  }
})
</script>