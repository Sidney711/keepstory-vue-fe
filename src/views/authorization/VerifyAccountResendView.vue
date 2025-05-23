<template>
  <div>
    <v-img
      data-testid="verify-email-logo"
      class="mx-auto my-6"
      max-width="228"
      src="/logos/keepstory-logo.png"
    ></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-card-title class="text-h5 justify-center">
        {{ $t('verifyEmail.title') }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          data-testid="verify-email-email-field"
          v-model="state.email"
          :label="$t('verifyEmail.label.email')"
          density="compact"
          :placeholder="$t('verifyEmail.placeholder.email')"
          :error-messages="v$.email.$errors.map(e => e.$message)"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          @blur="v$.email.$touch"
          @input="v$.email.$touch"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          data-testid="verify-email-resend-button"
          color="red"
          size="large"
          variant="tonal"
          block
          @click="submitForm"
        >
          {{ $t('verifyEmail.button.resend') }}
        </v-btn>
      </v-card-actions>

      <div class="flex justify-center gap-1 mt-4">
        <span
          @click="changeLanguage('cs')"
          :class="{'font-bold': locale === 'cs'}"
          class="cursor-pointer"
        >
          {{ $t('menu.language.cs') }}
        </span>
        <span>/</span>
        <span
          @click="changeLanguage('en')"
          :class="{'font-bold': locale === 'en'}"
          class="cursor-pointer"
        >
          {{ $t('menu.language.en') }}
        </span>
      </div>

      <v-card-text class="text-center">
        <router-link
          data-testid="verify-email-back-to-login"
          class="text-red text-decoration-none"
          to="/login"
          rel="noopener noreferrer"
        >
          {{ $t('verifyEmail.link.backToLogin') }} <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core';
import { useI18n } from 'vue-i18n';
import { required, email } from '@/utils/i18n-validators';
import { AccountService } from '@/services/AccountService';
import type { VerifyAccountResendRequest } from '@/interfaces/accounts';
import router from '@/router';
import { useSnackbar } from '@/composables/useSnackbar';

const { t, locale } = useI18n();
const { showSnackbar } = useSnackbar();

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
    return;
  }

  try {
    await AccountService.verifyAccountResend(state);
    showSnackbar(t('verifyEmail.alert.emailSent'), 'success');
    await router.push({ name: 'login' });
  } catch {
    showSnackbar(t('verifyEmail.alert.error'), 'error');
  }
};

const changeLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('locale', lang);
}

onMounted(() => {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale) {
    locale.value = savedLocale;
  } else {
    localStorage.setItem('locale', 'cs');
    locale.value = 'cs';
  }
});
</script>

<style scoped>
</style>
