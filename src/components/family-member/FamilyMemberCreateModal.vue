<template>
  <v-dialog v-model="dialog" max-width="500" data-testid="create-member-modal">
    <v-card>
      <v-card-title class="headline" data-testid="modal-title">{{ t('family.createMemberTitle') }}</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            data-testid="first-name-field"
            v-model="state.firstName"
            :label="t('family.label.firstName')"
            :error-messages="v$.firstName.$errors.map(e => e.$message)"
            @blur="v$.firstName.$touch"
            required
          ></v-text-field>
          <v-text-field
            data-testid="last-name-field"
            v-model="state.lastName"
            :label="t('family.label.lastName')"
            :error-messages="v$.lastName.$errors.map(e => e.$message)"
            @blur="v$.lastName.$touch"
            required
          ></v-text-field>
          <v-text-field
            data-testid="date-of-birth-field"
            v-model="state.dateOfBirth"
            :label="t('family.label.dateOfBirth')"
            type="date"
            :error-messages="v$.dateOfBirth.$errors.map(e => e.$message)"
            @blur="v$.dateOfBirth.$touch"
          ></v-text-field>
          <v-checkbox
            data-testid="is-alive-checkbox"
            v-model="state.isAlive"
            :label="t('family.label.isAlive')"
            @change="onAliveChange"
          ></v-checkbox>
          <v-text-field
            v-if="!state.isAlive"
            data-testid="date-of-death-field"
            v-model="state.dateOfDeath"
            :label="t('family.label.dateOfDeath')"
            type="date"
            :hint="t('family.hint.dateOfDeath')"
            persistent-hint
            :error-messages="v$.dateOfDeath.$errors.map(e => e.$message)"
            @blur="v$.dateOfDeath.$touch"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          data-testid="create-family-member-button"
          color="red"
          variant="tonal"
          @click="submitForm"
        >
          {{ t('family.button.create') }}
        </v-btn>
        <v-btn data-testid="cancel-create-member-button" text @click="closeDialog">
          {{ t('general.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import useVuelidate from '@vuelidate/core'
import { maxLength, required } from '@/utils/i18n-validators.ts'
import { FamilyMembersService } from '@/services/FamilyMemberService.ts'
import { createI18nMessage } from '@vuelidate/validators'
import { useSnackbar } from '@/composables/useSnackbar.ts'

const { t } = useI18n()
const withI18nMessage = createI18nMessage({ t: (key, ...args) => t(key, ...args) })
const { showSnackbar } = useSnackbar()

const notAfterTodayRaw = (value: string) => {
  if (!value) return true
  const today = new Date()
  const inputDate = new Date(value)
  return inputDate <= today
}
const notAfterToday = withI18nMessage(notAfterTodayRaw, { message: 'validations.notAfterToday' })

const birthBeforeDeathRaw = (value: string, vm: any) => {
  if (!value || !vm.dateOfBirth) return true
  return new Date(vm.dateOfBirth) <= new Date(value)
}
const birthBeforeDeath = withI18nMessage(birthBeforeDeathRaw, { message: 'validations.birthBeforeDeath' })

const dialog = ref(false)
const state = reactive({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  isAlive: true,
  dateOfDeath: ''
})
const rules = {
  firstName: { required, maxLength: maxLength(100) },
  lastName: { required, maxLength: maxLength(100) },
  dateOfBirth: { notAfterToday },
  dateOfDeath: { notAfterToday, birthBeforeDeath }
}
const v$ = useVuelidate(rules, state)

const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
  state.firstName = ''
  state.lastName = ''
  state.dateOfBirth = ''
  state.dateOfDeath = ''
  state.isAlive = true
  v$.value.$reset()
}
const submitForm = async () => {
  const valid = await v$.value.$validate()
  if (!valid) return
  const payload = {
    data: {
      attributes: {
        first_name: state.firstName,
        last_name: state.lastName,
        ...(state.dateOfBirth ? { date_of_birth: state.dateOfBirth } : {}),
        ...(!state.isAlive && state.dateOfDeath ? { date_of_death: state.dateOfDeath } : {}),
        deceased: !state.isAlive
      }
    }
  }
  try {
    await FamilyMembersService.createFamilyMember(payload)
    closeDialog()
    showSnackbar(t('family.alert.successCreate'), 'success')
    emit('memberCreated')
  } catch (err: any) {
    showSnackbar(t('family.alert.errorCreate'), 'error')
  }
}
const onAliveChange = () => {
  if (state.isAlive) {
    state.dateOfDeath = ''
  }
}
const emit = defineEmits(['memberCreated'])
defineExpose({ openDialog })
</script>

<style scoped>
</style>
