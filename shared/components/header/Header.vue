<template>
    <div class="w-100 d-flex flex-row p-2 card">
      <div class="col-4 d-flex justify-content-start">
        <div class="d-flex gap-2 align-items-center">
            <NuxtLink
              to="/"
              :class="[isActivePage('/about-us') ? 'text-primary' : 'text-secondary' ,'text-decoration-none rounded p-1 px-2 px-2']"
              >
              <div class="d-flex flex-row gap-2 align-items-center">
                  <label class="fw-bold">About us</label>
              </div>
            </NuxtLink>
            <NuxtLink
              to="/services"
              :class="[isActivePage('/services') ? 'text-primary' : 'text-secondary' ,'text-decoration-none rounded p-1 px-2']"
              >
              <div class="d-flex flex-row gap-2 align-items-center">
                <label class="fw-bold">Services</label>
              </div>
            </NuxtLink>
        </div>
      </div>
      <div class="col-4 d-flex align-items-center">
        <h4 class="text-primary m-2 fw-bold text-center w-100">Zhanuya Med</h4>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <div class="d-flex gap-2 align-items-center">
            <NuxtLink
              to="/"
              :class="[isActivePage('/') ? 'text-primary' : 'text-secondary' ,'text-decoration-none rounded p-1 px-2 px-2']"
              >
              <div class="d-flex flex-row gap-2 align-items-center">
                  <label class="fw-bold">Doctors</label>
              </div>
            </NuxtLink>
            <NuxtLink
              to="/auth/signup"
              :class="[isActivePage('/auth/signup') ? 'text-primary' : 'text-secondary' ,'text-decoration-none rounded p-1 px-2']"
              >
              <div class="d-flex flex-row gap-2 align-items-center">
                <i class="bi bi-person-circle fs-3" />
              </div>
            </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const isActivePage = (path: string) => {
    return route.path === path
  }
  </script>
  