<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
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

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Confirm password
      </div>

      <v-text-field
        v-model="state['password-confirm']"
        :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visibleConfirmPassword ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
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
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="submitForm"
      >
        Sign up
      </v-btn>

      <v-card-text class="text-center">
        <router-link
          class="text-blue text-decoration-none"
          to="/login"
          rel="noopener noreferrer"
        >
          Already have account? Log in here! <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, maxLength, minLength, required, sameAs } from '@vuelidate/validators'
import { AccountService } from '@/services/accountService.ts'
import type { AccountRequest } from '@/interfaces/accounts.ts'

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
  'password-confirm': { required, minLength: minLength(8), maxLength: maxLength(64),
                     sameAsPassword: sameAs(passwordRef) },
}

const v$ = useVuelidate(rules, state)

const submitForm = async () => {
  const isValid = await v$.value.$validate()

  if (!isValid) {
    console.log('Formulář není validní')
    return
  }

  try {
    const response = await AccountService.createAccount(state)
    console.log('Úspěšně odesláno:', response.data)
    alert('Účet byl úspěšně vytvořen!')
  } catch (error) {
    console.error('Chyba při odesílání:', error)
    alert('Chyba při vytváření účtu. Zkontrolujte data a zkuste to znovu.')
  }
}
</script>

<style scoped>
</style>
