<template>
  <AppLayout>
    <v-container>
      <h1 class="text-h4 my-6">{{ t('profile.title') }}</h1>

      <v-card class="pa-6 mb-8" elevation="8" max-width="600">
        <h2 class="text-h6 mb-4">{{ t('profile.changePassword.title') }}</h2>
        <v-form>
          <v-text-field
            data-testid="profile-change-password-current-field"
            v-model="changePasswordState.password"
            :type="showCurrentPassword ? 'text' : 'password'"
            :label="t('profile.changePassword.currentPasswordLabel')"
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
            data-testid="profile-change-password-new-field"
            v-model="changePasswordState['new-password']"
            :type="showNewPassword ? 'text' : 'password'"
            :label="t('profile.changePassword.newPasswordLabel')"
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
            data-testid="profile-change-password-confirm-field"
            v-model="changePasswordState['password-confirm']"
            :type="showConfirmNewPassword ? 'text' : 'password'"
            :label="t('profile.changePassword.confirmNewPasswordLabel')"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showConfirmNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showConfirmNewPassword = !showConfirmNewPassword"
            :error-messages="vChangePassword['password-confirm'].$errors.map(e => e.$message)"
            @blur="vChangePassword['password-confirm'].$touch()"
            @input="vChangePassword['password-confirm'].$touch()"
            required
            density="compact"
          ></v-text-field>

          <v-btn
            data-testid="profile-change-password-button"
            color="red"
            class="mt-4"
            @click="submitChangePassword"
            block
            variant="tonal"
          >
            {{ t('profile.changePassword.button') }}
          </v-btn>
        </v-form>
      </v-card>

      <v-card class="pa-6 mb-8" elevation="8" max-width="600">
        <h2 class="text-h6 mb-4">{{ t('profile.changeEmail.title') }}</h2>
        <v-form>
          <v-text-field
            data-testid="profile-change-email-email-field"
            v-model="changeEmailState.email"
            :label="t('profile.changeEmail.newEmailLabel')"
            prepend-inner-icon="mdi-email-outline"
            :error-messages="vChangeEmail.email.$errors.map(e => e.$message)"
            @blur="vChangeEmail.email.$touch()"
            @input="vChangeEmail.email.$touch()"
            required
            density="compact"
          ></v-text-field>

          <v-text-field
            data-testid="profile-change-email-password-field"
            v-model="changeEmailState.password"
            :type="showEmailPassword ? 'text' : 'password'"
            :label="t('profile.changeEmail.passwordLabel')"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showEmailPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showEmailPassword = !showEmailPassword"
            :error-messages="vChangeEmail.password.$errors.map(e => e.$message)"
            @blur="vChangeEmail.password.$touch()"
            @input="vChangeEmail.password.$touch()"
            required
            density="compact"
          ></v-text-field>

          <v-btn
            data-testid="profile-change-email-button"
            color="red"
            class="mt-4"
            @click="submitChangeEmail"
            block
            variant="tonal"
          >
            {{ t('profile.changeEmail.button') }}
          </v-btn>
        </v-form>
      </v-card>

      <v-card class="pa-6 mb-8" elevation="8" max-width="600">
        <h2 class="text-h6 mb-4">{{ t('profile.deleteAccount.title') }}</h2>
        <v-form>
          <v-text-field
            data-testid="profile-delete-account-password-field"
            v-model="closeAccountState.password"
            :type="showDeletePassword ? 'text' : 'password'"
            :label="t('profile.deleteAccount.confirmPasswordLabel')"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showDeletePassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showDeletePassword = !showDeletePassword"
            :error-messages="vCloseAccount.password.$errors.map(e => e.$message)"
            @blur="vCloseAccount.password.$touch()"
            @input="vCloseAccount.password.$touch()"
            required
            density="compact"
          ></v-text-field>

          <v-btn
            data-testid="profile-delete-account-button"
            color="red"
            class="mt-4"
            @click="submitCloseAccount"
            block
          >
            {{ t('profile.deleteAccount.button') }}
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n'
import { required, email, minLength, maxLength, sameAs } from '@/utils/i18n-validators'
import AppLayout from '@/layouts/AppLayout.vue'
import { AccountService } from '@/services/AccountService'
import { useSnackbar } from '@/composables/useSnackbar'
import { useConfirm } from '@/composables/useConfirm'
import { useAuthorizationStore } from '@/stores/authorizationStore.ts'

const { showConfirm } = useConfirm()
const { t } = useI18n()
const { showSnackbar } = useSnackbar()

// Change Password
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
    return
  }
  try {
    const payload = {
      password: changePasswordState.password,
      'new-password': changePasswordState['new-password'],
      'password-confirm': changePasswordState['password-confirm']
    }
    await AccountService.changePassword(payload)
    showSnackbar(t('profile.changePassword.alert.success'), 'success')
  } catch {
    showSnackbar(t('profile.changePassword.alert.error'), 'error')
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
    return
  }
  try {
    const payload = {
      email: changeEmailState.email,
      password: changeEmailState.password
    }
    await AccountService.changeLogin(payload)
    showSnackbar(t('profile.changeEmail.alert.success'), 'success')
  } catch {
    showSnackbar(t('profile.changeEmail.alert.error'), 'error')
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
    return
  }

  const confirmed = await showConfirm({
    message: t('profile.deleteAccount.confirmMessage'),
    title: t('general.confirmation'),
    confirmText: t('general.delete'),
    cancelText: t('general.cancel')
  })

  if (!confirmed) {
    return
  }
  try {
    const payload = { password: closeAccountState.password }
    await AccountService.closeAccount(payload)
    const authorizationStore = useAuthorizationStore()
    await authorizationStore.logout()
    showSnackbar(t('profile.deleteAccount.alert.success'), 'success')
  } catch {
    showSnackbar(t('profile.deleteAccount.alert.error'), 'error')
  }
}
</script>

<style scoped>
</style>
