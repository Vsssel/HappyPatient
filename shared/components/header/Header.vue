<template>
    <div class="w-100 d-flex flex-row card">
      <div class="col-6 d-flex align-items-center">
        <NuxtLink
          to="/doctors"
          class="text-primary text-decoration-none rounded"
          >
          <h6 class="text-primary d-flex align-items-center m-2 gap-2 fw-bold text-center w-100">
            Happy Patient
            <div v-for="(crumb, index) in breadcrumbs" :key="index" @click.prevent="navigateToBreadcrumb(crumb)" class="d-none d-md-flex flex-row align-items-center justify-content-center gap-2">
              <span class="text-secondary fs-5 fw-light">/</span>
              <a href="#" :class="[isActivePage(crumb.path) ? 'text-primary' : 'text-secondary', 'text-decoration-none fw-medium']" style="font-size: 14px;">
                {{ `${crumb.name}` }}
              </a>
            </div>
          </h6>
        </NuxtLink>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <div class="d-flex gap-2 align-items-center">
            <NuxtLink
              to="/doctors"
              class="text-decoration-none rounded p-1"
              >
              <div class="d-flex flex-row gap-2 align-items-center">
                  <label :class="[isActivePage('/doctors') ? 'text-primary' : 'text-secondary' ,'fw-bold']">Doctors</label>
              </div>
            </NuxtLink>
            <NuxtLink
              to="/services"
              class="text-decoration-none rounded p-1"
              >
              <div class="d-flex flex-row gap-2 align-items-center">
                <label :class="[isActivePage('/services') ? 'text-primary' : 'text-secondary' ,'fw-bold']">Services</label>
              </div>
            </NuxtLink>
            <NuxtLink
              :to="me.isAuthorized() ? '/myprofile' : '/auth/signin'"
              :class="[isActivePage('/services') ? 'text-primary' : 'text-secondary' ,'text-decoration-none rounded p-1']"
              >
              <div class="d-flex flex-row gap-2 align-items-center">
                <DefaultAvatar v-if="me.data.value?.name" :name="me.data.value.name" :surname="me.data.value?.surname"/>
              </div>
            </NuxtLink>
            <ThemeComponent class="me-2"/>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { useRoute , useRouter} from 'vue-router'
import DefaultAvatar from './DefaultAvatar.vue'
import {breadcrumbs, removeBreadcrumbsAfter } from '~/shared/stores/useBreadCrumb'
import type { BreadCrumb } from '~/shared/stores/useBreadCrumb'
import ThemeComponent from './ThemeComponent.vue'
import me from '~/shared/stores/User'

const route = useRoute()
const router = useRouter()

 
function navigateToBreadcrumb(crumb: BreadCrumb) {
  removeBreadcrumbsAfter(crumb.path)
  router.push(crumb.path)
}
  
const isActivePage = (path: string) => {
  return route.fullPath.includes(path)
}
</script>
  