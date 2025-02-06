<template>
  <AppLayout>
    <v-container>
      <h1 class="text-h4 my-6">Profil</h1>

      <v-card class="pa-6 mb-8" elevation="8" max-width="600">
        <h2 class="text-h6 mb-4">Změna hesla</h2>
        <v-form>
          <v-text-field
            v-model="changePasswordState.password"
            :type="showCurrentPassword ? 'text' : 'password'"
            label="Současné heslo"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showCurrentPassword = !showCurrentPassword"
            :error-messages="vChangePassword.password.$errors.map(e => e.$message)"
            @blur="vChangePassword.password.$touch()"
            @input="vChangePassword.password.$touch()"
            required
            density="compact"
          ></v-text-field>

          <v-text-field
            v-model="changePasswordState['new-password']"
            :type="showNewPassword ? 'text' : 'password'"
            label="Nové heslo"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showNewPassword = !showNewPassword"
            :error-messages="vChangePassword['new-password'].$errors.map(e => e.$message)"
            @blur="vChangePassword['new-password'].$touch()"
            @input="vChangePassword['new-password'].$touch()"
            required
            density="compact"
          ></v-text-field>

          <v-text-field
            v-model="changePasswordState['password-confirm']"
            :type="showConfirmNewPassword ? 'text' : 'password'"
            label="Potvrzení nového hesla"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showConfirmNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showConfirmNewPassword = !showConfirmNewPassword"
            :error-messages="vChangePassword['password-confirm'].$errors.map(e => e.$message)"
            @blur="vChangePassword['password-confirm'].$touch()"
            @input="vChangePassword['password-confirm'].$touch()"
            required
            density="compact"
          ></v-text-field>

          <v-btn color="primary" class="mt-4" @click="submitChangePassword" block>
            Změnit heslo
          </v-btn>
        </v-form>
      </v-card>

      <v-card class="pa-6 mb-8" elevation="8" max-width="600">
        <h2 class="text-h6 mb-4">Změna e-mailu</h2>
        <v-form>
          <v-text-field
            v-model="changeEmailState.email"
            label="Nový e-mail"
            prepend-inner-icon="mdi-email-outline"
            :error-messages="vChangeEmail.email.$errors.map(e => e.$message)"
            @blur="vChangeEmail.email.$touch()"
            @input="vChangeEmail.email.$touch()"
            required
            density="compact"
          ></v-text-field>

          <v-text-field
            v-model="changeEmailState.password"
            :type="showEmailPassword ? 'text' : 'password'"
            label="Heslo"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showEmailPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showEmailPassword = !showEmailPassword"
            :error-messages="vChangeEmail.password.$errors.map(e => e.$message)"
            @blur="vChangeEmail.password.$touch()"
            @input="vChangeEmail.password.$touch()"
            required
            density="compact"
          ></v-text-field>

          <v-btn color="primary" class="mt-4" @click="submitChangeEmail" block>
            Změnit e-mail
          </v-btn>
        </v-form>
      </v-card>

      <v-card class="pa-6 mb-8" elevation="8" max-width="600">
        <h2 class="text-h6 mb-4">Smazat účet</h2>
        <v-form>
          <v-text-field
            v-model="closeAccountState.password"
            :type="showDeletePassword ? 'text' : 'password'"
            label="Heslo pro potvrzení"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showDeletePassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showDeletePassword = !showDeletePassword"
            :error-messages="vCloseAccount.password.$errors.map(e => e.$message)"
            @blur="vCloseAccount.password.$touch()"
            @input="vCloseAccount.password.$touch()"
            required
            density="compact"
          ></v-text-field>

          <v-btn color="red" class="mt-4" @click="submitCloseAccount" block>
            Smazat účet
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs } from '@vuelidate/validators'
import AppLayout from '@/layouts/AppLayout.vue'
import { AccountService } from '@/services/AccountService'

interface ChangePasswordState {
  password: string;
  'new-password': string;
  'password-confirm': string;
}

const changePasswordState = reactive<ChangePasswordState>({
  password: '',
  'new-password': '',
  'password-confirm': '',
})

const newPasswordRef = computed(() => changePasswordState['new-password'])

const changePasswordRules = {
  password: { required },
  'new-password': { required, minLength: minLength(8), maxLength: maxLength(64) },
  'password-confirm': {
    required,
    minLength: minLength(8),
    maxLength: maxLength(64),
    sameAsNewPassword: sameAs(newPasswordRef)
  },
}

const vChangePassword = useVuelidate(changePasswordRules, changePasswordState)

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmNewPassword = ref(false)

const submitChangePassword = async () => {
  const isValid = await vChangePassword.value.$validate()
  if (!isValid) {
    console.log('Formulář pro změnu hesla není validní')
    return
  }
  try {
    const payload = {
      password: changePasswordState.password,
      'new-password': changePasswordState['new-password'],
      'password-confirm': changePasswordState['password-confirm']
    }
    const response = await AccountService.changePassword(payload)
    console.log('Heslo bylo úspěšně změněno', response.data)
    alert('Heslo bylo úspěšně změněno.')
  } catch (error) {
    console.error('Chyba při změně hesla:', error)
    alert('Došlo k chybě při změně hesla.')
  }
}

interface ChangeEmailState {
  email: string;
  password: string;
}

const changeEmailState = reactive<ChangeEmailState>({
  email: '',
  password: '',
})

const changeEmailRules = {
  email: { required, email },
  password: { required }
}

const vChangeEmail = useVuelidate(changeEmailRules, changeEmailState)
const showEmailPassword = ref(false)

const submitChangeEmail = async () => {
  const isValid = await vChangeEmail.value.$validate()
  if (!isValid) {
    console.log('Formulář pro změnu e-mailu není validní')
    return
  }
  try {
    const payload = {
      email: changeEmailState.email,
      password: changeEmailState.password
    }
    const response = await AccountService.changeLogin(payload)
    console.log('E-mail byl úspěšně změněn', response.data)
    alert('E-mail byl úspěšně změněn.')
  } catch (error) {
    console.error('Chyba při změně e-mailu:', error)
    alert('Došlo k chybě při změně e-mailu.')
  }
}

interface CloseAccountState {
  password: string;
}

const closeAccountState = reactive<CloseAccountState>({
  password: ''
})

const closeAccountRules = {
  password: { required }
}

const vCloseAccount = useVuelidate(closeAccountRules, closeAccountState)
const showDeletePassword = ref(false)

const submitCloseAccount = async () => {
  const isValid = await vCloseAccount.value.$validate()
  if (!isValid) {
    console.log('Formulář pro smazání účtu není validní')
    return
  }
  if (!confirm('Opravdu chcete smazat účet? Tato operace je nevratná.')) {
    return
  }
  try {
    const payload = { password: closeAccountState.password }
    const response = await AccountService.closeAccount(payload)
    console.log('Účet byl smazán', response.data)
    alert('Účet byl smazán.')
  } catch (error) {
    console.error('Chyba při mazání účtu:', error)
    alert('Došlo k chybě při mazání účtu.')
  }
}
</script>

<style scoped>
</style>
