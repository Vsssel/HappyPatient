<script setup lang="ts">
import { ref } from "vue";

import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Toast from "primevue/toast";

import doctor from "~/assets/registration/doctor.png";

useSeoMeta({
  title: "Registration page | EasyHealth+",
  description: "Registration page for EasyHealth+ medical service platform",
});

const toast = useToast();
const router = useRouter()

const email: Ref<String> = ref("");
const password: Ref<String> = ref("");
const rPassword: Ref<String> = ref("");

  const handleRegister = () => {
  if (email.value && password.value) {
    toast.add({
      severity: "success",
      summary: "Registration Successful",
      detail: "You have been registerred in successfully!",
      life: 3000,
    });

    setTimeout(() => {
      router.push({ path: "/dashboard", query: { showToast: "true" } });
    }, 1000);
  } else {
    toast.add({
      severity: "error",
      summary: "Registration Failed",
      detail: "Please enter valid credentials.",
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
        <div class="login-input">
          <InputText v-model="email" type="email" placeholder="Email" />
          <Password v-model="password" placeholder="Password" toggleMask />
          <Password
            v-model="rPassword"
            placeholder="Confirm password"
            toggleMask
            :feedback="false"
          />
          <Button label="Register" class="p-mt-3" @click="handleRegister" />
        </div>
        <p>
          Already have account?
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
  background-color: #19be46;
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
  text-align: center;
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
  color: #19be46;
  cursor: pointer;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
