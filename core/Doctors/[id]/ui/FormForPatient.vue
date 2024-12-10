<template>
  <FormField v-if="appointmentFor === 'Patient'" :formGroup="formForPatient">
    <template v-if="!isPatientHasAccount" #button>
      <button @click="invitePatient" class="btn btn-sm btn-primary m-2 w-100">
        Invite patient
      </button>
    </template>
    <template #button></template>
    <template #isPatientHasAccount>
      <span class="text"> Is patient have account? </span>
      <div class="d-flex mt-2 flex-row gap-3">
        <div class="d-flex flex-row gap-2">
          <RadioButton v-model="isPatientHasAccount" :value="true" name="Yes" />
          <span class="text">Yes</span>
        </div>
        <div class="d-flex flex-row gap-2">
          <RadioButton v-model="isPatientHasAccount" :value="false" name="Yes" />
          <span class="text">No</span>
        </div>
      </div>
    </template>
    <template v-if="!isPatientHasAccount" #email>
      <div class="d-flex flex-column mt-2 mb-2 gap-2">
        <span class="text">Email: </span>
        <InputText v-model="email" />
        <span v-if="emailError" class="text text-danger">{{ emailError }}</span>
      </div>
    </template>
  </FormField>
</template>
<script lang="ts" setup>
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'
import { formForPatient, isPatientHasAccount, email, emailError, appointmentFor } from '../values'
import { emailValidation } from '../utils'
import { useToast } from 'primevue/usetoast'
import { postInvitePatient } from '../api/postInvitePatient'
import FormField from '~/shared/components/form/FormField.vue'

const toast = useToast()

const invitePatient = async() => {
  if(email.value == '' ){
    emailError.value = 'Email Required'
    return
  }
  else if (!emailValidation(email.value)){
    emailError.value = 'Email is invalid'
    return
  }
  const response = await postInvitePatient({email: email.value})
  if (response.status < 400) {
    toast.add({severity: 'success', summary: 'Success', detail: response.data.detail, life: 4000 })
    email.value = ''
  }else {
    toast.add({severity: 'error', summary: 'Success', detail: response.data.detail, life: 4000 })
  }
}
</script>