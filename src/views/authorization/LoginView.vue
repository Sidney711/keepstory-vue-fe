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
      <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

      <v-text-field
        v-model="state.email"
        density="compact"
        placeholder="Email address"
        :error-messages="v$.email.$errors.map(e => e.$message)"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        @blur="v$.email.$touch"
        @input="v$.email.$touch"
        required
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
        <router-link
          class="text-caption text-decoration-none text-red"
          to="/reset-password-request"
          rel="noopener noreferrer"
        >
          Forgot login password?
        </router-link>
      </div>

      <v-text-field
        v-model="state.password"
        :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visiblePassword ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        :error-messages="v$.password.$errors.map(e => e.$message)"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visiblePassword = !visiblePassword"
        @blur="v$.password.$touch"
        @input="v$.password.$touch"
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
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <router-link
          class="text-red text-decoration-none"
          to="/registration"
          rel="noopener noreferrer"
        >
          Don't have an account? Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>

      <v-card-text class="text-center">
        <router-link
          class="text-red text-decoration-none"
          to="/verify-account-resend"
          rel="noopener noreferrer"
        >
          Didn't get verification e-mail? Get it here!<v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import type { LoginRequest } from '@/interfaces/accounts'
import { AccountService } from '@/services/AccountService.ts'

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
    console.log('Formulář není validní')
    return
  }

  try {
    await AccountService.login({
      email: state.email,
      password: state.password,
    })

    await router.push({ name: 'homepage' })
  } catch (error) {
    console.error('Chyba při přihlášení:', error)
    alert('Přihlášení selhalo. Zkontrolujte přihlašovací údaje.')
  }
}
</script>

<style scoped>
</style>
