<template>
    <MyProfilePage />
</template>
<script setup lang="ts">
import MyProfilePage from '~/core/MyProfie/MyProfilePage.vue';
import { addBreadcrumb, clearBreadcrumbs } from '~/shared/stores/useBreadCrumb'

onMounted(() => {
    clearBreadcrumbs()
    addBreadcrumb({name: 'My Profile', path: '/myprofile'})
})
</script>