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
          <h2>Registration</h2>
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
import Toast from 'primevue/toast';
import doctor from '~/assets/registration/doctor.png';
import { formNumber } from './values';
import AuthForm from './components/AuthForm.vue';
import SignUpForm from './components/SignUpForm.vue';

</script>

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
