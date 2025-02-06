<template>
  <div class="d-flex flex-column align-center justify-center pa-6">
    <v-img
      class="mx-auto my-6"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8 min-w-[500px]"
      elevation="8"
      rounded="lg"
    >
      <v-card-title class="text-h5 justify-center">
        Reset Password
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="state.password"
          :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visiblePassword ? 'text' : 'password'"
          label="New Password"
          density="compact"
          placeholder="Enter your new password"
          :error-messages="v$.password.$errors.map(e => e.$message)"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visiblePassword = !visiblePassword"
          @blur="v$.password.$touch"
          @input="v$.password.$touch"
          required
        ></v-text-field>

        <v-text-field
          v-model="state['password-confirm']"
          :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visibleConfirmPassword ? 'text' : 'password'"
          label="Confirm Password"
          density="compact"
          placeholder="Confirm your new password"
          :error-messages="v$['password-confirm'].$errors.map(e => e.$message)"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visibleConfirmPassword = !visibleConfirmPassword"
          @blur="v$['password-confirm'].$touch"
          @input="v$['password-confirm'].$touch"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="submitForm"
        >
          Reset Password
        </v-btn>
      </v-card-actions>

      <v-card-text class="text-center">
        <router-link
          class="text-blue text-decoration-none"
          to="/login"
          rel="noopener noreferrer"
        >
          Back to login <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, sameAs } from '@vuelidate/validators';
import { AccountService } from '@/services/AccountService';
import type { ResetPasswordPayload } from '@/interfaces/accounts';

const visiblePassword = ref(false);
const visibleConfirmPassword = ref(false);

const state = reactive<ResetPasswordPayload>({
  key: '',
  password: '',
  'password-confirm': '',
});

const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.query.key && typeof route.query.key === 'string') {
    state.key = route.query.key;
  } else {
    router.push({ name: 'login' });
  }
});

const passwordRef = computed(() => state.password);

const rules = {
  key: { required },
  password: { required, minLength: minLength(8), maxLength: maxLength(64) },
  'password-confirm': {
    required,
    minLength: minLength(8),
    maxLength: maxLength(64),
    sameAsPassword: sameAs(passwordRef)
  },
};

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    console.log('Formulář není validní');
    return;
  }

  try {
    const response = await AccountService.resetPassword(state);
    console.log('Password reset successful:', response.data);
    alert('Your password has been reset successfully!');
    await router.push({ name: 'login' });
  } catch (error) {
    console.error('Error resetting password:', error);
    alert('There was an error resetting your password. Please try again.');
  }
};
</script>

<style scoped>
</style>
