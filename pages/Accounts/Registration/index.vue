<script setup lang="ts">
import { ref } from 'vue';
import FormField from '~/shared/components/form/FormField.vue';
import type { FormFields, FormGroup } from '~/shared/components/form/types';
import Toast from 'primevue/toast';
import doctor from '~/assets/registration/doctor.png';

useSeoMeta({
  title: 'Registration page | EasyHealth+',
  description: 'Registration page for EasyHealth+ medical service platform',
});

const toast = useToast();
const router = useRouter();

const formValues = ref({
  name: '',
  surname: '',
  email: '',
  phone: '',
  iin: '',
  dateOfBirth: '',
  password: '',
  confirmPassword: '',
});

const formGroup: FormGroup[] = [
  {
    class: 'd-flex flex-row gap-4 justify-content-between w-100',
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
        label: { text: 'First Name: ' },
        value: formValues.value.name,
        placeholder: 'Enter your first name',
        class: 'w-100',
      },
      {
        name: 'surname',
        type: 'text',
        required: true,
        label: { text: 'Surname: ' },
        value: formValues.value.surname,
        placeholder: 'Enter your surname',
        class: 'w-100',
      },
    ],
  },
  {
    class: 'd-flex flex-row gap-4 justify-content-between w-100',
    fields: [
      {
        name: 'phone',
        type: 'text',
        required: true,
        label: { text: 'Phone: ' },
        value: formValues.value.phone,
        placeholder: 'Enter your phone number',
        class: 'w-100',
      },
      {
        name: 'iin',
        type: 'number',
        required: true,
        label: { text: 'IIN: ' },
        value: formValues.value.iin,
        placeholder: 'Enter your IIN',
        class: 'w-100',
      },
    ],
  },
  {
    class: 'column w-100',
    fields: [
      {
        name: 'email',
        type: 'text',
        required: true,
        label: { text: 'Email: ' },
        value: formValues.value.email,
        placeholder: 'Enter your email',
        class: 'col-12',
      },
      {
        name: 'dateOfBirth',
        type: 'date',
        required: true,
        label: { text: 'Date of Birth: ' },
        value: formValues.value.dateOfBirth
          ? new Date(formValues.value.dateOfBirth)
          : null,
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
    class: 'row',
    fields: [
      {
        name: 'password',
        type: 'password',
        feedback: true,
        required: true,
        label: { text: 'Password: ' },
        value: formValues.value.password,
        placeholder: 'Enter your password',
        class: 'col-6',
      },
      {
        name: 'confirmPassword',
        type: 'password',
        required: true,
        label: { text: 'Confirm Password: ' },
        value: formValues.value.confirmPassword,
        placeholder: 'Confirm your password',
        class: 'col-6',
      },
    ],
  },
];

const onSubmit = async (fieldValues: Record<string, any>) => {
  if (fieldValues.password !== fieldValues.confirmPassword) {
    toast.add({
      severity: 'error',
      summary: 'Password Mismatch',
      detail: 'Passwords do not match!',
      life: 3000,
    });
    return;
  }

  const payload = {
    name: fieldValues.name,
    surname: fieldValues.surname,
    email: fieldValues.email,
    phone: fieldValues.phone,
    iin: fieldValues.iin,
    date_of_birth: fieldValues.dateOfBirth,
    emailVerificationCode: 0,
    password: fieldValues.password,
  };

  try {
    const response = await fetch(
      'http://172.20.10.8:8000/patient/auth/sign-up',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    toast.add({
      severity: 'success',
      summary: 'Registration Successful',
      detail: 'You have been registered successfully!',
      life: 3000,
    });

    router.push('/accounts/login');
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Registration Failed',
      detail: 'There was an issue during registration. Please try again.',
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="login-page">
    <div class="left-side">
      <div class="title">
        <h1>Create account on EasyHealth</h1>
        <p>Become our patient and get fast and easy treatment!</p>
        <img :src="doctor" alt="Doctor" width="250" />
      </div>
    </div>
    <div class="right-side">
      <div class="login-block">
        <h2>Registration</h2>
        <FormField :formGroup="formGroup" v-model:fieldsValues="formValues" :submit="onSubmit">
          <template #button>
            <button class="btn btn-primary px-3">Sign up</button>
          </template>
        </FormField>
        <p>
          Already have an account?
          <NuxtLink to="/accounts/login" class="register-link">Login</NuxtLink>
        </p>
      </div>
    </div>
  </div>

  <Toast />
</template>

<style scoped>
.login-page {
  display: flex;
  flex-direction: row-reverse;
  height: 100vh;
}

.left-side {
  background-color: #0d6efd;
  width: 40%;
  display: flex;
  align-items: end;
  justify-content: center;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
}

.title h1 {
  font-size: 30px;
}

.title p {
  font-size: 20px;
}

.right-side {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.login-block h2 {
  margin-bottom: 1.5rem;
} 

.register-link {
  color: #0d6efd;
  cursor: pointer;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
