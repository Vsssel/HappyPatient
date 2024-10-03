<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import FormField from '~/shared/components/form/FormField.vue';
import type { FormFields } from '~/shared/components/form/types';
import doctor from '~/assets/login/doctor.png';
import { useRouter } from 'vue-router';

useSeoMeta({
  title: 'Login page | EasyHealth+',
  description: 'Login page for EasyHealth+ medical service platform',
});

const toast = useToast();
const router = useRouter();

const formValues = ref({
  name: '',
  password: '',
});

const fields: FormFields[] = [
  {
    name: 'email',
    type: 'text',
    required: true,
    label: { text: 'Email: ' },
    value: formValues.value.name,
    placeholder: 'Enter your email',
    icon: 'pi pi-user',
    class: 'col-12',
  },
  {
    name: 'password',
    type: 'password',
    feedback: true,
    required: true,
    label: { text: 'Password:' },
    value: formValues.value.password,
    placeholder: 'Enter password',
    class: 'col-12',
  },
];

const onSubmit = (fieldValues: Record<string, any>) => {
  console.log('Form Submitted:', fieldValues);

  if (fieldValues.email && fieldValues.password) {
    toast.add({
      severity: 'success',
      summary: 'Login Successful',
      detail: 'You have been logged in successfully!',
      life: 3000,
    });

    setTimeout(() => {
      router.push({ path: '/dashboard', query: { showToast: 'true' } });
    }, 1000);
  }
};
</script>

<template>
  <div class="login-page">
    <div class="left-side">
      <div class="title">
        <h1>Welcome to EasyHealth!</h1>
        <p>We are want to Automize process of giving treatment</p>
        <img :src="doctor" alt="Doctor" />
      </div>
    </div>
    <div class="right-side">
      <div class="login-block">
        <h2>Login</h2>
        <FormField
          :formFields="fields"
          :submit="onSubmit"
          v-model:fieldsValues="formValues"
        >
          <template #button>
            <button class="btn btn-primary px-3">Log in</button>
          </template>
        </FormField>
        <p>
          Don't have account?
          <NuxtLink to="/accounts/registration" class="register-link"
            >Register</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
  <Toast />
</template>

<style scoped>
.login-page {
  display: flex;
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
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.login-block h2 {
  margin-bottom: 1.5rem;
}

.login-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.login-input input {
  width: 100%;
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
