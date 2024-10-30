<template>
    <div class="login-page">
      <div class="left-side">
        <div class="title">
          <h1>Create account on Zhanuya Med</h1>
          <p>Become our patient and get fast and easy treatment!</p>
          <img :src="doctor" alt="Doctor" width="250" />
        </div>
      </div>
      <div class="right-side">
        <div class="login-block w-50">
          <h2>Sign up</h2>
          <Stepper v-model:value="formNumber" class="w-50">
            <StepList class="">
              <Step 
                v-slot="{ value }" asChild :value="1">
                <button 
                  class="bg-transparent border-0 p-2" 
                >
                  <span
                    :class="[
                      'rounded-circle text-white',
                      { 'bg-primary p-2 border-primary': value <= formNumber, 'border-surface-200': value > formNumber }
                    ]"
                    style="width: 8vw; height: 8vw; max-width: 50px; max-height: 50px;"
                  >
                    <i class="pi pi-at" style="font-size: 1rem;" />
                  </span>
                </button>
                <Divider/>
              </Step>
              <Step v-slot="{ value }" asChild :value="2">
                <button 
                  class="bg-transparent border-0 gap-2"
                >
                  <span
                    :class="[
                      'p-2 text-white rounded-circle',
                      { 'bg-primary border-primary': value <= formNumber, 'bg-secondary': value > formNumber }
                    ]"
                    style="width: 8vw; height: 8vw; max-width: 50px; max-height: 50px;"
                  >
                    <i class="bi bi-person" style="font-size: 1rem;" />
                  </span>
                </button>
              </Step>
            </StepList>
          </Stepper>
          <div class="w-100">
            <AuthForm v-if="formNumber === 1" />
            <SignUpForm v-if="formNumber === 2"/>
          </div>
          <p>
            Already have an account?
            <NuxtLink to="/auth/signin" class="register-link">Login</NuxtLink>
          </p>
        </div>
      </div>
    </div>
    <Toast />
  </template>  
<script setup lang="ts">
import Toast from 'primevue/toast'
import doctor from '~/assets/registration/doctor.png'
import AuthForm from './components/AuthForm.vue'
import SignUpForm from './components/SignUpForm.vue'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import Step from 'primevue/step'
import Divider from 'primevue/divider'
import { formNumber } from './values'

</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: row-reverse;
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

.register-link {
  color: #0d6efd;
  cursor: pointer;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
