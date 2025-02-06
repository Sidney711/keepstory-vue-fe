<template>
  <div class="d-flex flex-column align-center justify-center pa-6">
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="/logos/keepstory-logo.png"
    ></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-card-title class="text-h5 justify-center">
        Resend Verification Email
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="state['email']"
          label="Email address"
          density="compact"
          placeholder="Enter your email"
          :error-messages="v$['email'].$errors.map(e => e.$message)"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          @blur="v$['email'].$touch"
          @input="v$['email'].$touch"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn color="red" size="large" variant="tonal" block @click="submitForm">
          Resend Verification Email
        </v-btn>
      </v-card-actions>

      <v-card-text class="text-center">
        <router-link class="text-red text-decoration-none" to="/login" rel="noopener noreferrer">
          Back to login <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { AccountService } from '@/services/AccountService';
import type { VerifyAccountResendRequest } from '@/interfaces/accounts';
import router from '@/router'

const state = reactive<VerifyAccountResendRequest>({
  email: '',
});

const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    console.log('Formulář není validní');
    return;
  }

  try {
    const response = await AccountService.verifyAccountResend(state);
    console.log('Ověřovací e-mail odeslán:', response.data);
    alert('Ověřovací e-mail byl odeslán! Zkontrolujte prosím svou schránku.');
    await router.push({ name: 'login' });
  } catch (error) {
    console.error('Chyba při odesílání ověřovacího e-mailu:', error);
    alert('Chyba při odesílání ověřovacího e-mailu. Zkuste to prosím znovu.');
  }
};
</script>

<style scoped>
</style>
