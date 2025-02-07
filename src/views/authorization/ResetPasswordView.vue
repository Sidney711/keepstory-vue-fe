<template>
  <div>
    <v-img
      data-testid="reset-password-logo"
      class="mx-auto my-6"
      max-width="228"
      src="/logos/keepstory-logo.png"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      max-width="448"
      elevation="8"
      rounded="lg"
    >
      <v-card-title class="text-h5 justify-center">
        {{ $t('resetPasswordPage.title') }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          data-testid="reset-password-new-password-field"
          v-model="state.password"
          :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visiblePassword ? 'text' : 'password'"
          :label="$t('resetPasswordPage.label.newPassword')"
          density="compact"
          :placeholder="$t('resetPasswordPage.placeholder.newPassword')"
          :error-messages="v$.password.$errors.map(e => e.$message)"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visiblePassword = !visiblePassword"
          @blur="v$.password.$touch"
          @input="v$.password.$touch"
          required
        ></v-text-field>

        <v-text-field
          data-testid="reset-password-confirm-password-field"
          v-model="state['password-confirm']"
          :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visibleConfirmPassword ? 'text' : 'password'"
          :label="$t('resetPasswordPage.label.confirmPassword')"
          density="compact"
          :placeholder="$t('resetPasswordPage.placeholder.confirmPassword')"
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
          data-testid="reset-password-reset-button"
          color="red"
          size="large"
          variant="tonal"
          block
          @click="submitForm"
        >
          {{ $t('resetPasswordPage.button.resetPassword') }}
        </v-btn>
      </v-card-actions>

      <v-card-text class="text-center">
        <router-link
          data-testid="reset-password-back-to-login"
          class="text-red text-decoration-none"
          to="/login"
          rel="noopener noreferrer"
        >
          {{ $t('resetPasswordPage.link.backToLogin') }}
          <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, sameAs } from '@/utils/i18n-validators';
import { AccountService } from '@/services/AccountService';
import type { ResetPasswordPayload } from '@/interfaces/accounts';
import { useI18n } from 'vue-i18n';
import { useSnackbar } from '@/composables/useSnackbar';

const { t } = useI18n();

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
const { showSnackbar } = useSnackbar();

const submitForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }

  try {
    await AccountService.resetPassword(state);
    showSnackbar(t('resetPasswordPage.alert.passwordResetSuccess'), 'success');
    await router.push({ name: 'login' });
  } catch {
    showSnackbar(t('resetPasswordPage.alert.error'), 'error');
  }
};
</script>

<style scoped>
</style>
