<template>
  <div>
    <v-img
      data-testid="registration-logo"
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
        {{ $t('registration.label.email') }}
      </div>

      <v-text-field
        data-testid="registration-email-field"
        v-model="state.email"
        density="compact"
        :placeholder="$t('registration.placeholder.email')"
        :error-messages="v$.email.$errors.map(e => e.$message)"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        @blur="v$.email.$touch"
        @input="v$.email.$touch"
        required
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        {{ $t('registration.label.password') }}
      </div>

      <v-text-field
        data-testid="registration-password-field"
        v-model="state.password"
        :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visiblePassword ? 'text' : 'password'"
        density="compact"
        :placeholder="$t('registration.placeholder.password')"
        :error-messages="v$.password.$errors.map(e => e.$message)"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visiblePassword = !visiblePassword"
        @blur="v$.password.$touch"
        @input="v$.password.$touch"
        required
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        {{ $t('registration.label.confirmPassword') }}
      </div>

      <v-text-field
        data-testid="registration-confirm-password-field"
        v-model="state['password-confirm']"
        :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visibleConfirmPassword ? 'text' : 'password'"
        density="compact"
        :placeholder="$t('registration.placeholder.confirmPassword')"
        :error-messages="v$['password-confirm'].$errors.map(e => e.$message)"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visibleConfirmPassword = !visibleConfirmPassword"
        @blur="v$['password-confirm'].$touch"
        @input="v$['password-confirm'].$touch"
        required
      ></v-text-field>

      <v-btn
        data-testid="signup-button"
        class="mb-8"
        color="red"
        size="large"
        variant="tonal"
        block
        @click="submitForm"
      >
        {{ $t('registration.button.signup') }}
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

      <v-card-text class="text-center">
        <router-link
          data-testid="login-link"
          class="text-red text-decoration-none"
          to="/login"
          rel="noopener noreferrer"
        >
          {{ $t('registration.link.login') }}
          <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n'
import { email, maxLength, minLength, required, sameAs } from '@/utils/i18n-validators'
import { AccountService } from '@/services/AccountService.ts'
import type { AccountRequest } from '@/interfaces/accounts'
import router from '@/router'
import { useSnackbar } from '@/composables/useSnackbar'

const { t, locale } = useI18n()

const visiblePassword = ref(false)
const visibleConfirmPassword = ref(false)

const initialState = {
  email: '',
  password: '',
  'password-confirm': '',
}

const state = reactive<AccountRequest>({
  ...initialState,
})

const passwordRef = computed(() => state.password)

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8), maxLength: maxLength(64) },
  'password-confirm': {
    required,
    minLength: minLength(8),
    maxLength: maxLength(64),
    sameAsPassword: sameAs(passwordRef)
  },
}

const v$ = useVuelidate(rules, state)
const { showSnackbar } = useSnackbar()

const submitForm = async () => {
  const isValid = await v$.value.$validate()

  if (!isValid) {
    return
  }

  try {
    await AccountService.createAccount(state)
    showSnackbar(t('registration.alert.accountCreated'), 'success')
    await router.push({ name: 'login' })
  } catch {
    showSnackbar(t('registration.alert.registrationError'), 'error')
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
