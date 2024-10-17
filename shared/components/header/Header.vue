<template>
    <div class="w-100 d-flex flex-row card">
      <div class="col-6 d-flex align-items-center">
        <NuxtLink
          to="/"
          class="text-primary text-decoration-none rounded"
          >
          <h5 class="text-primary m-2 fw-bold text-center w-100">Happy Patient</h5>
      </NuxtLink>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <div class="d-flex gap-2 align-items-center">
            <NuxtLink
              to="/"
              :class="[isActivePage('/') ? 'text-primary' : 'text-secondary' ,'text-decoration-none rounded p-1 px-2']"
              >
              <div class="d-flex flex-row gap-2 align-items-center">
                  <label class="fw-bold">Doctors</label>
              </div>
            </NuxtLink>
            <NuxtLink
              to="/services"
              :class="[isActivePage('/services') ? 'text-primary' : 'text-secondary' ,'text-decoration-none rounded p-1']"
              >
              <div class="d-flex flex-row gap-2 align-items-center">
                <label class="fw-bold">Services</label>
              </div>
            </NuxtLink>
            <NuxtLink
              to="/auth/signup"
              :class="[isActivePage('/auth/signup') ? 'text-primary' : 'text-secondary' ,'text-decoration-none rounded p-1']"
              >
              <div class="d-flex flex-row gap-2 align-items-center">
                <DefaultAvatar />
              </div>
            </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { useRoute } from 'vue-router'
import DefaultAvatar from './DefaultAvatar.vue'
  
const route = useRoute()
  
const isActivePage = (path: string) => {
  return route.path === path
}
</script>
  