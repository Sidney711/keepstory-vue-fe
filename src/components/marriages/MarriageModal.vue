<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline d-flex justify-space-between align-center">
        <span>{{ isUpdate ? 'Upravit manželství' : 'Přidat manželství' }}</span>
        <v-btn v-if="isUpdate" color="error" @click="deleteMarriage" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="localState.period"
            label="Období"
            :error-messages="v$.period.$errors.map(e => e.$message)"
            @blur="v$.period.$touch"
          />
          <v-select
            v-model="localState.secondPartnerId"
            :items="secondPartnerOptions"
            label="Druhý partner"
            item-title="text"
            item-value="value"
            :return-object="false"
            :error-messages="v$.secondPartnerId.$errors.map(e => e.$message)"
            @blur="v$.secondPartnerId.$touch"
            required
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
import { ref, reactive, computed, watch, onMounted } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@/utils/i18n-validators'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'
import { useSnackbar } from '@/composables/useSnackbar'
import { useI18n } from 'vue-i18n'
import { MarriageService } from '@/services/MarriageService'
import { useConfirm } from '@/composables/useConfirm'

const { showConfirm } = useConfirm()
const props = defineProps<{
  firstPartnerId: string;
  marriageData?: { id: string; period: string; partnerId: string } | null;
}>()
const emit = defineEmits(['marriageUpdated'])
const dialog = ref(false)
const localState = reactive({
  period: '',
  secondPartnerId: '',
  marriageId: ''
})
const isUpdate = computed(() => !!props.marriageData)
const familyStore = useFamilyMembersStore()

onMounted(async () => {
  await familyStore.fetchMinifiedFamilyMembers()
})
const secondPartnerOptions = computed(() =>
  familyStore.allMinifiedFamilyMembers.map(member => ({
    text: `${member.firstName} ${member.lastName} (nar. ${member.dateOfBirth || '-'})`,
    value: member.id
  }))
)
const { showSnackbar } = useSnackbar()
const { t } = useI18n()

watch(
  () => props.marriageData,
  (newData) => {
    if (newData) {
      localState.period = newData.period
      localState.secondPartnerId = secondPartnerOptions.value.find(
        (option) => option.value == newData.partnerId
      )?.value || ''
      localState.marriageId = newData.id
    } else {
      localState.period = ''
      localState.secondPartnerId = ''
      localState.marriageId = ''
    }
  },
  { immediate: true }
)
const rules = {
  period: { maxLength: maxLength(100) },
  secondPartnerId: { required }
}
const v$ = useVuelidate(rules, localState)
const openDialog = () => {
  if (!props.marriageData) {
    localState.period = ''
    localState.secondPartnerId = ''
    localState.marriageId = ''
  }
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
  if (!isUpdate.value) {
    localState.period = ''
    localState.secondPartnerId = ''
    localState.marriageId = ''
  }
  v$.value.$reset()
}
const submitForm = async () => {
  if (localState.secondPartnerId && typeof localState.secondPartnerId === 'object' && localState.secondPartnerId.value) {
    localState.secondPartnerId = localState.secondPartnerId.value
  }
  const valid = await v$.value.$validate()
  if (!valid) return
  const relationships =
    isUpdate.value && localState.marriageId
      ? {
        'first-partner': {
          data: { type: 'family_members', id: props.firstPartnerId }
        },
        'second-partner': {
          data: { type: 'family_members', id: localState.secondPartnerId }
        }
      }
      : {
        first_partner: {
          data: { type: 'family_members', id: props.firstPartnerId }
        },
        second_partner: {
          data: { type: 'family_members', id: localState.secondPartnerId }
        }
      }
  const dataPayload: any = {
    type: 'marriages',
    attributes: {
      period: localState.period
    },
    relationships
  }
  if (isUpdate.value && localState.marriageId) {
    dataPayload.id = localState.marriageId
  }
  const payload = { data: dataPayload }
  try {
    if (isUpdate.value && localState.marriageId) {
      await MarriageService.updateMarriage(localState.marriageId, payload)
      showSnackbar(t('marriage.alert.successUpdate'), 'success')
    } else {
      await MarriageService.createMarriage(payload)
      showSnackbar(t('marriage.alert.successCreate'), 'success')
    }
    emit('marriageUpdated')
    closeDialog()
  } catch (err: any) {
    showSnackbar(t('marriage.alert.error'), 'error')
  }
}
const deleteMarriage = async () => {
  if (!localState.marriageId) return
  const confirmed = await showConfirm({
    message: 'Opravdu chcete smazat tohle manželství?',
    title: 'Smazání manželství',
    confirmText: t('general.delete'),
    cancelText: t('general.cancel')
  })
  if (!confirmed) return
  try {
    await MarriageService.deleteMarriage(localState.marriageId)
    showSnackbar(t('marriage.alert.successDelete'), 'success')
    emit('marriageUpdated')
    closeDialog()
  } catch (err: any) {
    showSnackbar(t('marriage.alert.errorDelete'), 'error')
  }
}
defineExpose({ openDialog, closeDialog })
</script>

<style scoped>
</style>
