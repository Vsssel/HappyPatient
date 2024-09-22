<template>
  <div class="w-100 d-flex flex-column align-items-center">
    <form
      novalidate
      :class="[props.fieldsColumn ? 'd-flex flex-column w-100' : 'd-flex flex-row w-100 justify-content-between', 'was-validated']"
      @submit.prevent="handleSubmit"
    >
      <div v-for="(field, index) in fields" :key="index" class="mb-3">
        <label v-if="field.text" class="form-label d-flex">
          {{ field.text }}
          <i v-if="field.required" style="font-size: 8px; color: red; margin-left: 4px;" class="bi-asterisk"></i>
        </label>
        <div>
          <div v-if="field.type === 'text'">
            <IconField>
              <InputIcon v-if="field.icon" :class="[field.icon]" />
              <InputText
                v-model="field.value"
                @input="handleInputChange"
                :placeholder="field.placeholder"
                :class="[field.class, { 'is-invalid': !isValid(field), 'is-valid': isValid(field) && field.value }]"
                :required="field.required"
              />
              <div v-if="!isValid(field) && validated" class="invalid-feedback">
                {{ field.required ? 'This field is required.' : '' }}
              </div>
            </IconField>
          </div>
          <div v-if="field.type === 'number'">
            <InputNumber
              v-model="field.value"
              @input="handleInputChange"
              :placeholder="field.placeholder"
              :class="[field.class, { 'is-invalid': !isValid(field), 'is-valid': isValid(field) && field.value }]"
              :required="field.required"
            />
            <div v-if="!isValid(field) && validated" class="invalid-feedback">
              {{ field.required ? 'This field is required.' : '' }}
            </div>
          </div>
          <div v-if="field.type === 'select'">
            <Select
              v-model="field.value"
              @change="handleInputChange"
              :options="field.options"
              option-label="label"
              option-value="value"
              :placeholder="field.placeholder"
              :class="[field.class, { 'is-invalid': !isValid(field), 'is-valid': isValid(field) && field.value }]"
              :required="field.required"
            />
            <div v-if="!isValid(field) && validated" class="invalid-feedback">
              {{ field.required ? 'This field is required.' : '' }}
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="handleSubmit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, watch, defineEmits } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import type { FormFields } from './types';

const validated = ref(false)

const props = defineProps<{
  fieldsRow?: FormFields;
  fieldsColumn?: FormFields;
  submit?: (fieldValues: Record<string, any>) => void;
}>();

const emit = defineEmits(['update:fieldsValues'])

const fields = reactive<FormFields>(props.fieldsRow ?? props.fieldsColumn ?? []);

const getFieldValues = () => {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.value;
    return acc;
  }, {} as Record<string, any>);
};

const handleInputChange = () => {
  emit('update:fieldsValues', getFieldValues())
};

const isValid = (field: any) => {
  return field.required ? field.value !== null && field.value !== '' : true
}

const handleSubmit = () => {
  validated.value = true
  const allValid = fields.every(isValid);
  if (allValid && props.submit) {
    props.submit(getFieldValues())
  } else {
    console.log('Form is invalid')
  }
};

watch(() => props.fieldsRow || props.fieldsColumn, (newFields) => {
  Object.assign(fields, newFields || []);
}, { immediate: true });
</script>
