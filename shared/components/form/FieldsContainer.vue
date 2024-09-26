<template>
    <template v-for="(field, index) in fields">
        <div class="w-100">
            <label v-if="field.label" :style="field.label.style" :class="[ field.label.class,'form-label d-flex']">
              {{ field.label.text }}
              <i v-if="field.required" style="font-size: 8px; color: red; margin-left: 4px;" class="bi-asterisk"></i>
            </label>
        <div>
        <div v-if="field.type === 'text'">
                <IconField>
                <InputIcon v-if="field.icon" :class="field.icon"></InputIcon>
                <InputText
                    v-model="field.value"
                    @input="handleInputChange"
                    :placeholder="field.placeholder"
                    :class="[field.class]"
                    
                />
                </IconField>
            </div>
            <div v-if="field.type === 'number'">
                <InputNumber
                v-model="field.value"
                @input="handleInputChange"
                :placeholder="field.placeholder"
                :class="[field.class]"
                
                />
            </div>
            <div v-if="field.type === 'password'">
                <Password
                toggle-mask
                input-class="w-100"
                v-model="field.value"
                @input="handleInputChange"
                :placeholder="field.placeholder"
                :class="[field.class]"
                
                :feedback="field.feedback || false"
                />
            </div>
            <div v-if="field.type === 'date'">
                <DatePicker
                v-model="field.value"
                @input="handleInputChange"
                :show-icon="field.showIcon ?? false"
                :icon-display="field.iconDisplay"
                :time-only="field.timeOnly ?? false"
                :min-date="field.minDate"
                :max-date="field.maxDate"
                :date-format="field.dateFormat ?? 'dd/mm/yy'"
                :fluid="true"
                :placeholder="field.placeholder"
                :show-button-bar="field.showButtonBar ?? false"
                :class="[field.class]"
                
                >
                <template #inputicon="slotProps">
                <i v-if="field.timeOnly" class="pi pi-clock" @click="slotProps.clickCallback" />
                </template>
            </DatePicker>
            </div>
            <div v-if="field.type === 'autocomplete'">
                <AutoComplete
                    v-model="field.value"
                    :suggestions="filteredSuggestions"
                    input-class="w-100"
                    @complete="search($event, field.suggestions)"
                    @change="handleInputChange"
                    :placeholder="field.placeholder"
                    :class="[field.class]"
                    
                />
            </div>
            <div v-if="field.type === 'select'">
                <Select
                v-model="field.value"
                @change="handleInputChange"
                :options="field.options"
                option-label="label"
                option-value="value"
                :placeholder="field.placeholder"
                :class="[field.class]"
                
                />
            </div>
            <div v-if="field.type === 'textarea'">
                <Textarea 
                v-model="field.value"
                @change="handleInputChange"
                :class="field.class"
                
                :rows="field.rows"
                :cols="field.cols"
                />
            </div>
            <template v-if="field.type === 'slot'">
              <slot :name="field.name"></slot>
            </template>
            </div>
            <p v-if="!isValid(field) && validated" :class="['p-0 fs-7 mt-2 mb-2 text-danger', field.class]">This filed is required</p>
        </div>
    </template>
  </template>
  
  <script setup lang="ts">
  import { reactive, defineProps, defineEmits } from 'vue';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  import Select from 'primevue/select';
  import Textarea from 'primevue/textarea';
  import AutoComplete from 'primevue/autocomplete';
  import DatePicker from 'primevue/datepicker';
  import Password from 'primevue/password';
  
  import type { FormFields } from './types';
  
  const props = defineProps<{ fields: FormFields[], validated: boolean }>();
  const emit = defineEmits(['update:fieldsValues']);
  
  const fields = reactive<FormFields[]>(props.fields ?? []);
  
  const handleInputChange = () => {
    emit('update:fieldsValues', fields);
  };
  
  const isValid = (field: any) => {
    return field.required ? field.value !== null && field.value !== '' : true;
  };
  
  const filteredSuggestions = ref();
  const search = (event: any, suggestions: string[] | number[]) => {
    if (!event.query.trim().length) {
      filteredSuggestions.value = [...suggestions];
    } else {
      filteredSuggestions.value = suggestions.filter((item) =>
        String(item).toLowerCase().startsWith(event.query.toLowerCase())
      );
    }
  };
  </script>
  