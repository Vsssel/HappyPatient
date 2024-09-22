<template>
  <div class="w-100 d-flex flex-column align-items-center">
    <form
      novalidate
      :class="[props.fieldsColumn ? 'd-flex flex-column w-100' : 'd-flex flex-row w-100 justify-content-between', 'was-validated']"
      @submit.prevent="handleSubmit"
    >
      <div v-for="(field, index) in fields" :key="index" class="mb-3">
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
                :required="field.required"
              />
            </IconField>
          </div>
          <div v-if="field.type === 'number'">
            <InputNumber
              v-model="field.value"
              @input="handleInputChange"
              :placeholder="field.placeholder"
              :class="[field.class]"
              :required="field.required"
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
              :required="field.required"
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
              :required="field.required"
            >
            <template #inputicon="slotProps">
              <i v-if="field.timeOnly" class="pi pi-clock" @click="slotProps.clickCallback" />
            </template>
          </DatePicker>
          </div>
          <!-- <div v-if="field.type === 'editor'">
            <Editor
              v-model="field.value"
              @input="handleInputChange"
              git 
              :class="[field.class]"
              :required="field.required"
            />
          </div> -->
          <div v-if="field.type === 'select'">
            <Select
              v-model="field.value"
              @change="handleInputChange"
              :options="field.options"
              option-label="label"
              option-value="value"
              :placeholder="field.placeholder"
              :class="[field.class]"
              :required="field.required"
            />
          </div>
          <!-- <template
            v-if="field.type === 'slot'"
          >
            <div
              class="form-group"
              :class="field.class"
              :style="field.style"
            >
              <slot
                :name="field.name"
                v-bind="{
                  value: inputs[field.name],
                  values: inputs,
                  inputs: allInputs,
                  setValue: (value) => {
                    setValue({
                      idx: idx,
                      name: field.name,
                      oldValue: inputs[field.name].value,
                      newValue: value
                    })
                  }
                }"
              />
            </div>
          </template> -->
        </div>
        <Message v-if="!isValid(field) && validated" severity="error" class="p-0 mt-2 mb-2">This filed is required</Message>
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
  fieldsRow?: FormFields[];
  fieldsColumn?: FormFields[];
  submit?: (fieldValues: Record<string, any>) => void;
}>();

const emit = defineEmits(['update:fieldsValues'])

const fields = reactive<FormFields[]>(props.fieldsRow ?? props.fieldsColumn ?? []);

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
