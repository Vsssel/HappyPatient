<template>
  <div>
    <form @submit.prevent="handleSubmit" class="w-100 d-flex flex-column align-items-center">
      <template v-if="fields.length">
        <FieldsContainer :fields="fields" :validated="validated">
          <template
                v-for="(_, slot) of $slots"
                #[slot]="scope"
              >
                <slot
                  :name="slot"
                  v-bind="scope"
                ></slot>
              </template>
        </FieldsContainer>
      </template>
      <template v-else-if="groupFields.length">
        <div v-for="(group, index) in groupFields" :class="group.class" :key="index">
          <FieldsContainer :fields="group.fields" :validated="validated">
            <template
                v-for="(_, slot) of $slots"
                #[slot]="scope"
              >
                <slot
                  :name="slot"
                  v-bind="scope"
                ></slot>
            </template>
            <slot
              v-if="('error' in $slots)"
              name="error"
            ></slot>
          </FieldsContainer>
        </div>
      </template>
      <slot
        v-if="('button' in $slots)"
        name="button"
        type="submit"
      ></slot>
      <button v-else type="submit" class="btn btn-primary mt-3 mb-3">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, defineProps } from 'vue';
import FieldsContainer from './FieldsContainer.vue';
import type { FormFields, FormGroup } from './types';

const validated = ref(false);

const props = defineProps<{
  formFields?: FormFields[];
  formGroup?: FormGroup[];
  submit?: (fieldValues: Record<string, any>) => void;
  onChange?: (fieldValues: Record<string, any>) => void;
}>();

const fields = reactive<FormFields[]>(props.formFields ?? []);
const groupFields = reactive<FormGroup[]>(props.formGroup ?? []); 

const getFieldValues = () => {
  const individualValues = fields.reduce((acc, field) => {
    acc[field.name] = field.value;
    return acc;
  }, {} as Record<string, any>);

  const groupValues = groupFields.reduce((acc, group) => {
    group.fields.forEach((field) => {
      acc[field.name] = field.value;
    });
    return acc;
  }, {} as Record<string, any>);

  return { ...individualValues, ...groupValues };
};

const isValid = (field: any) => {
  return field.required ? field.value !== null && field.value !== '' : true;
};

const handleSubmit = () => {
  validated.value = true;
  const allFields = [...fields, ...groupFields.flatMap(group => group.fields)];
  const allValid = allFields.every(isValid);
  if (allValid && props.submit) {
    props.submit(getFieldValues());
  } else {
    console.log('Form is invalid');
  }
}

const handleFieldChange = () => {
  if (props.onChange) {
    props.onChange(getFieldValues());
  }
};

watch(
  () => fields.map(field => field.value),
  handleFieldChange
);

watch(
  () => groupFields.flatMap(group => group.fields.map(field => field.value)),
  handleFieldChange
);

watch(
  () => props.formFields,
  (newFields) => {
    Object.assign(fields, newFields || []);
    handleFieldChange();
  },
  { immediate: true }
);

watch(
  () => props.formGroup,
  (newGroupFields) => {
    Object.assign(groupFields, newGroupFields || []);
    handleFieldChange();
  },
  { immediate: true }
);
</script>
