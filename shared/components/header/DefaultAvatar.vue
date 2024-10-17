<template>
    <div>
        <i v-if="!initials" class="bi bi-person-circle fs-3" />
        <div v-else class="bg-primary text-center border text-white fs-6 p-1 border-1 rounded-circle" style="width: 35px; height: 35px;">
            {{ initials }}
        </div>
    </div>
</template>
<script setup lang="ts">
import me from '~/shared/stores/User'
import { ref } from 'vue'

const initials = ref<string | null>(null)

console.log(me.data.value)
if(me.isAuthorized() && me.data.value){
    initials.value = me.data.value.name.slice(0, 1).toUpperCase() + me.data.value.surname.slice(0, 1).toUpperCase()
}
</script>