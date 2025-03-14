<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline d-flex justify-space-between align-center">
        <span>{{ isUpdate ? 'Upravit vzdělání' : 'Přidat vzdělání' }}</span>
        <v-btn v-if="isUpdate" color="error" @click="deleteEducation" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="localState.schoolName"
            label="Název školy"
            :error-messages="v$.schoolName.$errors.map(e => e.$message)"
            @blur="v$.schoolName.$touch"
            required
          />
          <v-text-field
            v-model="localState.address"
            label="Adresa školy"
            :error-messages="v$.address.$errors.map(e => e.$message)"
            @blur="v$.address.$touch"
          />
          <v-text-field
            v-model="localState.period"
            label="Období"
            :error-messages="v$.period.$errors.map(e => e.$message)"
            @blur="v$.period.$touch"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submitForm">
          {{ isUpdate ? 'Upravit' : 'Vytvořit' }}
        </v-btn>
        <v-btn text @click="closeDialog">Zrušit</v-btn>
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
import { EducationService } from '@/services/EducationService'
import { useConfirm } from '@/composables/useConfirm'

const { showConfirm } = useConfirm()

const props = defineProps<{
  familyMemberId: string;
  educationData?: { id: string; schoolName: string; address: string; period: string } | null;
}>()

const emit = defineEmits(['educationUpdated'])

const dialog = ref(false)

const localState = reactive({
  schoolName: '',
  address: '',
  period: '',
  educationId: ''
})

const isUpdate = computed(() => !!props.educationData)

watch(
  () => props.educationData,
  (newData) => {
    if (newData) {
      localState.schoolName = newData.schoolName
      localState.address = newData.address
      localState.period = newData.period
      localState.educationId = newData.id
    } else {
      localState.schoolName = ''
      localState.address = ''
      localState.period = ''
      localState.educationId = ''
    }
  },
  { immediate: true }
)

const rules = {
  schoolName: { required, maxLength: maxLength(250) },
  address: { maxLength: maxLength(250) },
  period: { maxLength: maxLength(100) }
}

const v$ = useVuelidate(rules, localState)
const { showSnackbar } = useSnackbar()
const { t } = useI18n()

const relationships =
  isUpdate.value && localState.educationId
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

const openDialog = () => {
  if (!props.educationData) {
    localState.schoolName = ''
    localState.address = ''
    localState.period = ''
    localState.educationId = ''
  }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  if (!isUpdate.value) {
    localState.schoolName = ''
    localState.address = ''
    localState.period = ''
    localState.educationId = ''
  }
  v$.value.$reset()
}

const submitForm = async () => {
  const valid = await v$.value.$validate()
  if (!valid) return

  const rels =
    isUpdate.value && localState.educationId
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
    type: 'educations',
    attributes: {
      school_name: localState.schoolName,
      address: localState.address,
      period: localState.period
    },
    relationships: rels
  }

  if (isUpdate.value && localState.educationId) {
    dataPayload.id = localState.educationId
  }

  const payload = { data: dataPayload }

  try {
    if (isUpdate.value && localState.educationId) {
      await EducationService.updateEducation(localState.educationId, payload)
      showSnackbar(t('education.alert.successUpdate'), 'success')
    } else {
      await EducationService.createEducation(payload)
      showSnackbar(t('education.alert.successCreate'), 'success')
    }
    emit('educationUpdated')
    closeDialog()
  } catch (err: any) {
    showSnackbar(t('education.alert.error'), 'error')
  }
}

const deleteEducation = async () => {
  if (!localState.educationId) return

  const confirmed = await showConfirm({
    message: 'Opravdu chcete smazat tohle vzdělání?',
    title: 'Smazání vzdělání',
    confirmText: t('general.delete'),
    cancelText: t('general.cancel')
  })

  if (!confirmed) {
    return
  }

  try {
    await EducationService.deleteEducation(localState.educationId)
    showSnackbar(t('education.alert.successDelete'), 'success')
    emit('educationUpdated')
    closeDialog()
  } catch (err: any) {
    showSnackbar(t('education.alert.errorDelete'), 'error')
  }
}

defineExpose({ openDialog, closeDialog })
</script>

<style scoped>
</style>
