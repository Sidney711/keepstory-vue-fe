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
      <!-- Label pro e-mail -->
      <div class="text-subtitle-1 text-medium-emphasis">
        {{ $t('registration.label.email') }}
      </div>

      <v-text-field
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
        class="mb-8"
        color="red"
        size="large"
        variant="tonal"
        block
        @click="submitForm"
      >
        {{ $t('registration.button.signup') }}
      </v-btn>

      <v-card-text class="text-center">
        <router-link
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
import { computed, reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n'
import { email, maxLength, minLength, required, sameAs } from '@/utils/i18n-validators'
import { AccountService } from '@/services/AccountService.ts'
import type { AccountRequest } from '@/interfaces/accounts'
import router from '@/router'

const { t } = useI18n()

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

const submitForm = async () => {
  const isValid = await v$.value.$validate()

  if (!isValid) {
    return
  }

  try {
    await AccountService.createAccount(state)
    alert(t('registration.alert.accountCreated'))
    await router.push({ name: 'login' })
  } catch {
    alert(t('registration.alert.registrationError'))
  }
}
</script>

<style scoped>
</style>
