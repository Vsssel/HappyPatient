<template>
  <div class="login-page">
    <div class="left-side">
      <div class="title">
        <h1>Welcome to Zhanuya Med!</h1>
        <p>We are want to Automize process of giving treatment</p>
        <img :src="doctor" alt="Doctor" />
      </div>
    </div>
    <div class="right-side">
      <div class="login-block w-50">
        <h2>Login</h2>
        <FormField
          class="w-100"
          :formFields="fields"
          :submit="onSubmit"
          v-model:values="values"
        >
          <template #button>
            <button 
              :class="['btn btn-primary px-3', load ? 'disabled' : '']">
              <i v-if="load" class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>
              Log in
            </button>
          </template>
          <template #error="{ field }">
            <label v-if="field.name === 'login' && (!errorEmail && !errorIIN) && validated" class="form-label text-danger">
                {{ 'Invalid login' }}
            </label>
            <label v-for="message in errorPassword" v-if="field.name === 'password' && errorPassword.length > 0 && validated" class="form-label text-danger">
                {{ message }}
            </label>
        </template>
        </FormField>
        <p>
          Don't have account?
          <NuxtLink to="/auth/signup" class="register-link"
            >Register</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
  <Toast />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import FormField from '~/shared/components/form/FormField.vue'
import type { FormFields } from '~/shared/components/form/types'
import doctor from '~/assets/login/doctor.png'
import { useRouter } from 'vue-router'
import type { PatientAuthSignInRequest } from './types'
import { postPatientAuthSignIn } from './api'
import { useToast } from 'primevue/usetoast'

const errorEmail = ref<boolean>(false)
const errorIIN = ref<boolean>(false)
const errorPassword = ref<string[]>([])
const validated = ref(false);
const load = ref<boolean>(false)

const toast = useToast()
const router = useRouter()


const values = ref<PatientAuthSignInRequest>({
  login: '',
  password: '',
});

const fields: FormFields[] = [
  {
    name: 'login',
    type: 'text',
    required: true,
    label: { text: 'Login: ' },
    value: values.value.login,
    placeholder: 'Enter your IIN or Email',
    icon: 'pi pi-user',
    class: 'w-100',
  },
  {
    name: 'password',
    type: 'password',
    required: true,
    label: { text: 'Password:' },
    value: values.value.password,
    placeholder: 'Enter password',
    class: 'w-100',
  },
];

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const isValidIIN = (iin: string): boolean => {
  const iinRegex = /^\d+$/
  return (iin.length === 12 && iinRegex.test(iin))
}

function validatePassword(password: string): string[]{
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one digit.");
  }
  if (/\s/.test(password)) {
    errors.push("Password must not contain spaces.");
  }

  return errors
}


const onSubmit = async(fieldValues: Record<string, any>) => {
  validated.value = true;
  errorEmail.value = isValidEmail(fieldValues.login)
  errorIIN.value = isValidIIN(fieldValues.login)
  errorPassword.value = validatePassword(fieldValues.password)
  if ((errorEmail.value && errorIIN.value) || errorPassword.value.length > 0) {
    return; 
  }
  values.value = {
    login: fieldValues.login,
    password: fieldValues.password
  }
  try{
    load.value = true
    const response = await postPatientAuthSignIn(values.value)
    if(response.status < 400){
      router.push('/')
    }else {
      toast.add({ severity: 'error', summary: response.message.detail, life: 3000 })
    }
    }catch(error){
      toast.add({ severity: 'error', summary: "Something went wrong", life: 3000 })
    }finally{
      load.value = false
    }
}
</script>
<style scoped>
.login-page {
  display: flex;
  height: 100vh;
  width: 100%;
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
