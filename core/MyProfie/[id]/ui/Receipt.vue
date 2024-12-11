<template>
  <div class="d-flex p-3 flex-column align-items-center gap-2">
      <div class="d-flex align-items-center p-2 justify-content-center rounded-circle" style="background-color: #23a26d1f; width: 65px; height: 65px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#23A26D" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
      </div>
      <h5>Payment Sussess!</h5>
      <p class="mt-2" style="width: 100%; border: gray dashed 1px;" />
      <div>
          <div v-for="info in paymentInfo" class="d-flex mt-1 mb-1 flex-row w-100 justify-content-between align-items-center">
              <span class="text col-6 text-secondary">
                  {{ info.title }}
              </span>
              <span class="text col-6 text-end text-dark">
                  {{ info.info }}
              </span>
          </div>
      </div>
      <p class="mt-2" style="width: 100%; border: gray dashed 1px;" />
      <div class="w-100">
          <div v-for="info in paymentInfo2" class="d-flex mt-1 mb-1 flex-row w-100 justify-content-between align-items-center">
              <span class="text col-6 text-secondary">
                  {{ info.title }}
              </span>
              <span class="text col-6 text-end text-dark">
                  {{ info.info }}
              </span>
          </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { paymentInfo2, paymentInfo } from '../values'
import { onMounted } from 'vue'
import { setPaymentInfo } from '../utils';

onMounted(() => {
    paymentInfo.value = []
    paymentInfo2.value = []
    setPaymentInfo()
})
</script>