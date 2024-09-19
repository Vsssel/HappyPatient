<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import doctor from "~/assets/login/doctor.png";
import { useRouter } from "vue-router";

useSeoMeta({
  title: "Login page | EasyHealth+",
  description: "Login page for EasyHealth+ medical service platform",
});

const username = ref<string>("");
const password = ref<string>("");

const toast = useToast();

const router = useRouter();

const handleLogin = () => {
  if (username.value && password.value) {
    toast.add({
      severity: "success",
      summary: "Login Successful",
      detail: "You have been logged in successfully!",
      life: 3000,
    });

    setTimeout(() => {
      router.push({ path: "/dashboard", query: { showToast: "true" } });
    }, 1000);
  } else {
    toast.add({
      severity: "error",
      summary: "Login Failed",
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
        <h1>Welcome to EasyHealth!</h1>
        <p>We are want to Automize process of giving treatment</p>
        <img :src="doctor" alt="Doctor" />
      </div>
    </div>
    <div class="right-side">
      <div class="login-block">
        <h2>Login</h2>
        <div class="login-input">
          <InputText v-model="username" placeholder="Username" />
          <Password
            v-model="password"
            placeholder="Password"
            toggleMask
            :feedback="false"
          />
          <Button label="Login" class="p-mt-3" @click="handleLogin" />
        </div>
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
