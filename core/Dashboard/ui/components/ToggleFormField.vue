<template>
    <FormField 
        :formGroup="FormFields" 
        :onChange="handleFieldChange"
        v-model:values="values" 
        class="w-100 mt-3 mb-3"
    >
        <template #button></template>
        <template #min_exp_years>
          <InputNumber 
            v-model="minExp"
            class="w-100"
          />
        </template>
        <template #sort_by>
            <label class="pb-3 form-label">Sort by</label>
            <div class="d-flex justify-content-between ">
                <div class="d-flex gap-1 align-items-center">
                    <RadioButton 
                        v-model="selectedSortBy" 
                        inputId="ingredient1" value="name" 
                    />
                    <label 
                        for="ingredient1" 
                        class="ml-2"
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
                    >
                        {{ 'Category' }}
                    </label>
                </div>
            </div>
        </template>
        <template #asc_order>
            <div class="d-flex flex-column">
                <label class="form-label"> </label>
                <ToggleButton 
                    v-model="checked" 
                    onLabel="Ascending" 
                    offLabel="Descending" 
                    onIcon="pi pi-arrow-up" 
                    offIcon="pi pi-arrow-down" 
                    class="w-50 d-flex align-self-end" 
                />
            </div>
        </template>
    </FormField>
</template>
<script setup lang="ts">
import RadioButton from 'primevue/radiobutton'
import type { FormGroup } from '~/shared/components/form/types'
import FormField from '~/shared/components/form/FormField.vue'
import { values } from '../../values'
import { ref, watch } from 'vue'

const checked = ref<boolean>(true)
const selectedSortBy = ref(undefined)
const minExp = ref(undefined)

const FormFields = ref<FormGroup[]>([
  {
    class: 'row w-100 align-items-center',
    fields: [
      {
        name: 'min_exp_years',
        type: 'slot',
        label: { text: 'Minimum experience in years' },
        class: 'col-4',
      },
      {
        name: 'sort_by',
        type: 'slot',
        class: 'col-4',
      },
      {
        name: 'asc_order',
        type: 'slot',
        class: 'col-4',
      }
    ]
  }
])

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