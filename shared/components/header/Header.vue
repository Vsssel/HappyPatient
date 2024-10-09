<template>
    <div class="w-100 d-flex flex-row p-2 card">
      <div class="col-6 d-flex align-items-center">
        <img src="../../../assets/logo.png" style="width: 45px; height: 45px;">
        <h4 class="text-primary m-2">Zhanuya Med</h4>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <div class="d-flex gap-2 align-items-center">
            <NuxtLink
            to="/"
            :class="[isActivePage('/') ? 'border border-primary' : '' ,'text-decoration-none rounded p-1 px-2 px-2']"
            >
            <div class="d-flex flex-row gap-2 align-items-center">
                <i class="bi bi-person-workspace fs-5"></i>
                <label v-if="isActivePage('/')" class="fw-bold">Dashboard</label>
            </div>
            </NuxtLink>
            <NuxtLink
            to="/services"
            :class="[isActivePage('/services') ? 'border border-primary' : '' ,'text-decoration-none rounded p-1 px-2']"
            >
            <div class="d-flex flex-row gap-2 align-items-center">
                <i class="bi bi-card-list fs-5"></i>
                <label v-if="isActivePage('/services')" class="fw-bold">Another Page</label>
            </div>
            </NuxtLink>
            <NuxtLink
            to="/settings"
            :class="[isActivePage('/settings') ? 'border border-primary' : '' ,'text-decoration-none rounded p-1 px-2']"
            >
            <div class="d-flex flex-row gap-2 align-items-center">
                <i class="bi bi-gear fs-5"></i>
                <label v-if="isActivePage('/settings')" class="fw-bold">Third Page</label>
            </div>
            </NuxtLink>
            <NuxtLink
            to="/auth/signin"
            :class="[isActivePage('/auth/signin') ? 'border border-primary' : '' ,'text-decoration-none rounded p-1 px-2']"
            >
            <div class="d-flex flex-row gap-2 align-items-center">
                <i class="bi bi-person-circle fs-5"></i>
                <label v-if="isActivePage('/auth/signin')" class="fw-bold">Third Page</label>
            </div>
            </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const isActivePage = (path) => {
    return route.path === path
  }
  </script>
  