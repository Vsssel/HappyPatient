<template>
    <FormField 
        :formGroup="secondFormField" 
        v-model:fieldsValues="formValues" 
        :submit="onSubmit"
        key="step-2"
    >
        <template #button>
            <div class="w-100 d-flex justify-content-between">
                <button class="btn btn-primary px-3" @click="formNumber = 1"><i class="bi bi-arrow-left p-2" />Back</button>
                <button 
                  :class="['btn btn-primary px-3', load ? 'disabled' : '']">
                    <i v-if="load" class="pi pi-spin pi-spinner" style="font-size: 1rem" />
                    Sign Up
                </button>
            </div>
        </template>
        <template #gender>
            <div class="w-100">
                <label class="form-label d-flex">
                    Select your gender
                    <i style="font-size: 8px; color: red; margin-left: 4px;" class="bi-asterisk" />
                </label>
                <div class="d-flex flex-row">
                    <div v-for="gender in genders" :key="gender.key" class="d-flex flex-row align-items-center">
                        <RadioButton v-model="selectedGender" :inputId="gender.key" name="dynamic" :value="gender.name" />
                        <label :for="gender.key" class="p-2">{{ gender.name }}</label>
                    </div>
                    <label v-if="errorGender && validated" class="form-label text-danger">
                      {{ 'This field is required' }}
                    </label>
                </div>
            </div>
        </template>
        <template #emailVerificationCode>
            <div class="d-flex flex-column align-items-center">
                <InputOtp integerOnly mask v-model="verification" />
                <label v-if="errorCode && validated" class="form-label text-danger">
                    {{ 'This field is required' }}
                </label>
            </div>
        </template>
        <template #error="{ field }">
            <label v-if="field.name === 'confirmPassword' && !errorPassword && validated" class="form-label text-danger">
              {{ 'Password Dismatch' }}
            </label>
        </template>
    </FormField>
    <Toast />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { PostPatientAuthSignUpRequest } from '../types'
import type { FormGroup } from '~/shared/components/form/types'
import FormField from '~/shared/components/form/FormField.vue'
import { formNumber } from '../values'
import InputOtp from 'primevue/inputotp'
import { name, surname, iin, email } from '../values'
import Toast from 'primevue/toast'
import { postPatientAuthSignUp } from '../api';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const selectedGender = ref<string>('');
const genders = ref([{ name: 'Male', key: 'male' }, { name: 'Female', key: 'female' }]);
const passwordVerification = ref<string>('');
const verification = ref()

const errorEmail = ref<boolean>(false)
const errorPassword = ref<boolean>(true)
const errorGender = ref<boolean>(true)
const errorCode = ref<boolean>(true)
const validated = ref(false);
const load = ref<boolean>(false)

const toast = useToast();
const router = useRouter();

const formValues = ref<PostPatientAuthSignUpRequest>({
  name: '',
  surname: '',
  email: '',
  iin: '',
  gender: '',
  birthDate: '',
  emailVerificationCode: -1,
  password: ''
});

const secondFormField: FormGroup[] = [
  {
    class: 'column w-100',
    fields: [
      {
        name: 'dateOfBirth',
        type: 'date',
        required: true,
        label: { text: 'Date of Birth: ' },
        value: formValues.value.birthDate ? new Date(formValues.value.birthDate) : null,
        placeholder: 'Enter your date of birth',
        class: 'col-12',
        showIcon: true,
        dateFormat: 'dd/mm/yy',
        minDate: new Date('1900-01-01'),
        maxDate: new Date(),
      },
    ],
  },
  {
    class: 'column w-100',
    fields: [
      {
        name: 'password',
        type: 'password',
        feedback: true,
        required: true,
        label: { text: 'Password: ' },
        value: formValues.value.password,
        placeholder: 'Enter your password',
        class: 'col-12',
      },
      {
        name: 'confirmPassword',
        type: 'password',
        required: true,
        label: { text: 'Confirm Password: ' },
        value: passwordVerification.value,
        placeholder: 'Confirm your password',
        class: 'col-12',
      },
    ],
  },
  {
    class: 'row w-100',
    fields: [
      {
        name: 'gender',
        type: 'slot',
        class: 'w-100 p-0',
      },
    ],
  },
  {
    class: 'w-100',
    fields: [
      {
        name: 'emailVerificationCode',
        type: 'slot',
        class: 'w-100 p-0',
      }
    ]
  }
];

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};


const onSubmit = async (fieldValues: Record<string, any>) => {
  validated.value = true;
  errorPassword.value = true
  if(fieldValues.password !== fieldValues.confirmPassword){
    errorPassword.value = false
    return
  }
  if(selectedGender.value === '' || selectedGender.value === undefined || selectedGender.value === null){
    errorGender.value = false
    return
  }
  if(verification.value === undefined || verification.value === null){
    errorCode.value = false
    return 
  }else{
    formValues.value = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        iin: iin.value,
        gender: selectedGender.value.toLowerCase() ?? undefined,
        birthDate: formatDate(fieldValues.dateOfBirth),
        emailVerificationCode: Number(verification.value) ?? undefined,
        password: fieldValues.password
    }
    load.value = true
    try{
      const response = await postPatientAuthSignUp(formValues.value)
      if(response.status < 400){
        load.value = false
        toast.add({ severity: 'success', summary: 'Account Created', life: 3000 });
        router.push('/auth/signin')
      }else {
        load.value = false
        toast.add({ severity: 'error', summary: response.message, life: 3000 });
      }
    }
    catch (error) {
      toast.add({ severity: 'error', summary: 'An error occurred', life: 3000 });
    }
    finally{
      load.value = false
    }
  }
}

</script>