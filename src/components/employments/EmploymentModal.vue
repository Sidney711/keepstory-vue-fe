<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline d-flex justify-space-between align-center">
        <span>{{ isUpdate ? t('employment.dialog.title.update') : t('employment.dialog.title.create') }}</span>
        <v-btn v-if="isUpdate" color="error" @click="deleteEmployment" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="localState.employer"
            :label="t('employment.field.employer')"
            :error-messages="v$.employer.$errors.map(e => e.$message)"
            @blur="v$.employer.$touch"
            required
          />
          <v-text-field
            v-model="localState.address"
            :label="t('employment.field.address')"
            :error-messages="v$.address.$errors.map(e => e.$message)"
            @blur="v$.address.$touch"
            required
          />
          <v-text-field
            v-model="localState.period"
            :label="t('employment.field.period')"
            :error-messages="v$.period.$errors.map(e => e.$message)"
            @blur="v$.period.$touch"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submitForm">
          {{ isUpdate ? t('employment.button.update') : t('employment.button.create') }}
        </v-btn>
        <v-btn text @click="closeDialog">{{ t('general.cancel') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@/utils/i18n-validators'
import { useSnackbar } from '@/composables/useSnackbar'
import { useI18n } from 'vue-i18n'
import { EmploymentService } from '@/services/EmploymentService'
import { useConfirm } from '@/composables/useConfirm'

const { showConfirm } = useConfirm()

const props = defineProps<{
  familyMemberId: string;
  employmentData?: { id: string; employer: string; address: string; period: string } | null;
}>()

const emit = defineEmits(['employmentUpdated'])

const dialog = ref(false)

const localState = reactive({
  employer: '',
  address: '',
  period: '',
  employmentId: ''
})

const isUpdate = computed(() => !!props.employmentData)

watch(
  () => props.employmentData,
  (newData) => {
    if (newData) {
      localState.employer = newData.employer
      localState.address = newData.address
      localState.period = newData.period
      localState.employmentId = newData.id
    } else {
      localState.employer = ''
      localState.address = ''
      localState.period = ''
      localState.employmentId = ''
    }
  },
  { immediate: true }
)

const rules = {
  employer: { required, maxLength: maxLength(250) },
  address: { maxLength: maxLength(250) },
  period: { maxLength: maxLength(100) }
}

const v$ = useVuelidate(rules, localState)
const { showSnackbar } = useSnackbar()
const { t } = useI18n()

const openDialog = () => {
  if (!props.employmentData) {
    localState.employer = ''
    localState.address = ''
    localState.period = ''
    localState.employmentId = ''
  }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  if (!isUpdate.value) {
    localState.employer = ''
    localState.address = ''
    localState.period = ''
    localState.employmentId = ''
  }
  v$.value.$reset()
}

const submitForm = async () => {
  const valid = await v$.value.$validate()
  if (!valid) return

  const relationships =
    isUpdate.value && localState.employmentId
      ? {
        'family-member': {
          data: { type: 'family_members', id: props.familyMemberId }
        }
      }
      : {
        family_member: {
          data: { type: 'family_members', id: props.familyMemberId }
        }
      }

  const dataPayload: any = {
    type: 'employments',
    attributes: {
      employer: localState.employer,
      address: localState.address,
      period: localState.period
    },
    relationships
  }

  if (isUpdate.value && localState.employmentId) {
    dataPayload.id = localState.employmentId
  }
  const payload = { data: dataPayload }

  try {
    if (isUpdate.value && localState.employmentId) {
      await EmploymentService.updateEmployment(localState.employmentId, payload)
      showSnackbar(t('employment.alert.successUpdate'), 'success')
    } else {
      await EmploymentService.createEmployment(payload)
      showSnackbar(t('employment.alert.successCreate'), 'success')
    }
    emit('employmentUpdated')
    closeDialog()
  } catch (err: any) {
    showSnackbar(t('employment.alert.error'), 'error')
  }
}

const deleteEmployment = async () => {
  if (!localState.employmentId) return

  const confirmed = await showConfirm({
    message: t('employment.delete.confirmMessage'),
    title: t('employment.delete.title'),
    confirmText: t('general.delete'),
    cancelText: t('general.cancel')
  })

  if (!confirmed) return

  try {
    await EmploymentService.deleteEmployment(localState.employmentId)
    showSnackbar(t('employment.delete.alert.successDelete'), 'success')
    emit('employmentUpdated')
    closeDialog()
  } catch (err: any) {
    showSnackbar(t('employment.delete.alert.errorDelete'), 'error')
  }
}

defineExpose({ openDialog, closeDialog })
</script>

<style scoped>
</style>
