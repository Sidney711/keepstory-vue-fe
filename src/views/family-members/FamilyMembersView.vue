<template>
  <AppLayout>
    <div class="container mx-auto px-4">
      <div v-if="familyStore.error" class="text-red-500 mb-4">
        {{ familyStore.error }}
      </div>
      <div v-if="familyStore.loading" class="mb-4">
        {{ t('family.loading') }}
      </div>
      <v-btn color="primary" class="mb-4" @click="openDialog">
        {{ t('family.button.create') }}
      </v-btn>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="member in familyStore.familyMembers"
            :key="member.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="mx-auto">
              <v-img src="/avatar-blank.png" height="200px"></v-img>
              <v-card-title class="text-h6">
                {{ member.firstName }} {{ member.lastName }}
              </v-card-title>
              <v-card-text>
                <p>
                  {{ t('family.label.dateOfBirth') }}: {{ member.dateOfBirth }}
                </p>
                <p v-if="member.dateOfDeath">
                  {{ t('family.label.dateOfDeath') }}:
                  <span>{{ member.dateOfDeath }}</span>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">
            {{ t('family.createMemberTitle') }}
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submitForm">
              <v-text-field
                v-model="state.firstName"
                :label="t('family.label.firstName')"
                :error-messages="v$.firstName.$errors.map(e => e.$message)"
                @blur="v$.firstName.$touch"
                required
              ></v-text-field>
              <v-text-field
                v-model="state.lastName"
                :label="t('family.label.lastName')"
                :error-messages="v$.lastName.$errors.map(e => e.$message)"
                @blur="v$.lastName.$touch"
                required
              ></v-text-field>
              <v-text-field
                v-model="state.dateOfBirth"
                :label="t('family.label.dateOfBirth')"
                type="date"
                :error-messages="v$.dateOfBirth.$errors.map(e => e.$message)"
                @blur="v$.dateOfBirth.$touch"
              ></v-text-field>
              <v-checkbox
                v-model="state.isAlive"
                :label="t('family.label.isAlive')"
                @change="onAliveChange"
              ></v-checkbox>
              <v-text-field
                v-if="!state.isAlive"
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
            <v-btn color="primary" @click="submitForm">
              {{ t('family.button.create') }}
            </v-btn>
            <v-btn text @click="closeDialog">
              {{ t('general.cancel') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLayout from '@/layouts/AppLayout.vue'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'
import type { NewFamilyMemberPayload } from '@/interfaces/familyMembers'
import useVuelidate from '@vuelidate/core'
import { required } from '@/utils/i18n-validators'
import { FamilyMembersService } from '@/services/FamilyMemberService.ts'
import { createI18nMessage } from '@vuelidate/validators'

const { t } = useI18n()
const withI18nMessage = createI18nMessage({ t: (key, ...args) => t(key, ...args) })
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
const familyStore = useFamilyMembersStore()
onMounted(() => {
  familyStore.fetchFamilyMembers()
})
const dialog = ref(false)
const state = reactive({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  isAlive: true,
  dateOfDeath: ''
})
const rules = {
  firstName: { required },
  lastName: { required },
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
  const payload: NewFamilyMemberPayload = {
    data: {
      attributes: {
        first_name: state.firstName,
        last_name: state.lastName,
        ...(state.dateOfBirth ? { date_of_birth: state.dateOfBirth } : {}),
        ...(!state.isAlive && state.dateOfDeath ? { date_of_death: state.dateOfDeath } : {})
      }
    }
  }
  try {
    await FamilyMembersService.createFamilyMember(payload)
    closeDialog()
    await familyStore.fetchFamilyMembers()
  } catch (err: any) {
    console.error('Chyba při vytváření osoby:', err)
  }
}
const onAliveChange = () => {
  if (state.isAlive) {
    state.dateOfDeath = ''
  }
}
</script>

<style scoped>
</style>
