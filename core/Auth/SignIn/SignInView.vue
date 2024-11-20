<template>
  <div class="d-flex flex-column flex-md-row w-100 vh-100">
    <div class="d-none d-md-flex bg-primary col-md-5 align-items-end justify-content-center">
      <div class="title text-center">
        <h1 class=" text-white mb-3">Welcome to Zhanuya Med!</h1>
        <p class="text-white mb-4">
          We want to automate the process of providing treatment.
        </p>
        <img :src="doctor" alt="Doctor" class="img-fluid w-50" />
      </div>
    </div>
    <div class="col-12 h-100 col-md-7 d-flex justify-content-center align-items-center p-3">
      <div class="login-block col-12 col-md-6">
        <h2 class="text-center mb-4">Login</h2>
        <FormField
          class="w-100"
          :formFields="fields"
          :submit="onSubmit"
          v-model:values="values"
        >
          <template #button>
            <button 
              :class="['btn btn-sm text btn-primary px-4 py-2 w-100', load ? 'disabled' : '']">
              <i v-if="load" class="pi pi-spin pi-spinner me-2 text"></i>
              Log in
            </button>
          </template>
          <template #error="{ field }">
            <label
              v-if="field.name === 'login' && (!errorEmail && !errorIIN) && validated"
              class="form-label text text-danger"
            >
              {{ 'Invalid login' }}
            </label>
            <label
              v-for="message in errorPassword"
              v-if="field.name === 'password' && errorPassword.length > 0 && validated"
              class="form-label text text-danger"
            >
              {{ message }}
            </label>
          </template>
        </FormField>
        <p class="mt-3 text-center text">
          Don't have an account? 
          <NuxtLink to="/auth/signup" class="register-link">Register</NuxtLink>
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
    label: { text: 'Login: ', class: 'text' },
    value: values.value.login,
    placeholder: 'Enter your IIN or Email',
    icon: 'pi pi-user',
    class: 'w-100',
  },
  {
    name: 'password',
    type: 'password',
    required: true,
    label: { text: 'Password:', class: 'text' },
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
      router.push('/doctors')
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

.left-side {
  background-color: #0d6efd;
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
