<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="/logos/keepstory-logo.png"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">
        {{ $t('login.label.email') }}
      </div>

      <v-text-field
        data-testid="email-field"
        v-model="state.email"
        density="compact"
        :placeholder="$t('login.placeholder.email')"
        :error-messages="v$.email.$errors.map(e => e.$message)"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        @blur="v$.email.$touch"
        @input="v$.email.$touch"
        required
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        {{ $t('login.label.password') }}
        <router-link
          class="text-caption text-decoration-none text-red"
          to="/reset-password-request"
          rel="noopener noreferrer"
        >
          {{ $t('login.link.forgotPassword') }}
        </router-link>
      </div>

      <v-text-field
        data-testid="password-field"
        v-model="state.password"
        :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visiblePassword ? 'text' : 'password'"
        density="compact"
        :placeholder="$t('login.placeholder.password')"
        :error-messages="v$.password.$errors.map(e => e.$message)"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visiblePassword = !visiblePassword"
        @blur="v$.password.$touch"
        @input="v$.password.$touch"
        required
      ></v-text-field>

      <v-btn
        data-testid="login-button"
        class="mb-8"
        color="red"
        size="large"
        variant="tonal"
        block
        @click="submitForm"
      >
        {{ $t('login.button.login') }}
      </v-btn>

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

      <v-card-text class="text-center flex flex-col gap-4">
        <router-link
          data-testid="register-link"
          class="text-red text-decoration-none"
          to="/registration"
          rel="noopener noreferrer"
        >
          {{ $t('login.link.register') }}
          <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
        <router-link
          data-testid="resend-verification-link"
          class="text-red text-decoration-none"
          to="/verify-account-resend"
          rel="noopener noreferrer"
        >
          {{ $t('login.link.resendVerification') }}
          <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { LoginRequest } from '@/interfaces/accounts'
import { AccountService } from '@/services/AccountService.ts'
import { required, minLength, email, maxLength } from '@/utils/i18n-validators'
import { useSnackbar } from '@/composables/useSnackbar'

const { showSnackbar } = useSnackbar()
const { t, locale } = useI18n()

const state = reactive<LoginRequest>({
  email: '',
  password: '',
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8), maxLength: maxLength(64) },
}

const v$ = useVuelidate(rules, state)
const visiblePassword = ref(false)
const router = useRouter()

const submitForm = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) {
    return
  }

  try {
    await AccountService.login({
      email: state.email,
      password: state.password,
    })

    await router.push({ name: 'homepage' })
  } catch {
    showSnackbar(t('login.alert.loginFailed'), 'error')
  }
}

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
