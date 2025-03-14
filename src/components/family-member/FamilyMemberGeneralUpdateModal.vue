<template>
  <v-dialog v-model="dialog" max-width="90%">
    <v-card>
      <v-card-title class="headline">Editace člena rodiny</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <section class="mb-6">
            <h2 class="mb-2 text-lg font-bold border-b pb-1">Základní informace</h2>
            <v-text-field
              v-model="state.firstName"
              label="Jméno"
              :error-messages="v$.firstName.$errors.map(e => e.$message)"
              @blur="v$.firstName.$touch"
              required
              outlined
              class="mb-4"
            />
            <v-text-field
              v-model="state.lastName"
              label="Příjmení"
              :error-messages="v$.lastName.$errors.map(e => e.$message)"
              @blur="v$.lastName.$touch"
              required
              outlined
              class="mb-4"
            />
            <v-textarea
              v-model="state.shortDescription"
              :error-messages="v$.shortDescription.$errors.map(e => e.$message)"
              @blur="v$.shortDescription.$touch"
              label="Krátký popis osoby"
              rows="2"
              outlined
              class="mb-4"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <v-text-field
                v-model="state.birthLastName"
                label="Rodné příjmení"
                :error-messages="v$.birthLastName.$errors.map(e => e.$message)"
                @blur="v$.birthLastName.$touch"
                outlined
              />
              <v-text-field
                v-model="state.dateOfBirth"
                label="Datum narození"
                type="date"
                :error-messages="v$.dateOfBirth.$errors.map(e => e.$message)"
                @blur="v$.dateOfBirth.$touch"
                outlined
              />
              <v-text-field
                v-model="state.birthPlace"
                label="Místo narození"
                :error-messages="v$.birthPlace.$errors.map(e => e.$message)"
                @blur="v$.birthPlace.$touch"
                outlined
              />
              <v-text-field
                v-model="state.birthTime"
                label="Čas narození"
                type="time"
                outlined
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <v-select
                v-model="state.gender"
                :items="genderItems"
                label="Pohlaví"
                outlined
                clearable
              />
              <v-text-field
                v-model="state.religion"
                label="Náboženství"
                :error-messages="v$.religion.$errors.map(e => e.$message)"
                @blur="v$.religion.$touch"
                outlined
              />
              <v-text-field
                v-model="state.profession"
                label="Profese"
                :error-messages="v$.profession.$errors.map(e => e.$message)"
                @blur="v$.profession.$touch"
                outlined
              />
            </div>
          </section>
          <v-checkbox
            v-model="state.isAlive"
            label="Žije osoba"
            @change="onAliveChange"
            class="mt-4"
          />
          <template v-if="!state.isAlive">
            <section class="mb-6">
              <h2 class="mb-2 text-lg font-bold border-b pb-1">Informace o úmrtí</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <v-text-field
                  v-model="state.dateOfDeath"
                  label="Datum úmrtí"
                  type="date"
                  :error-messages="v$.dateOfDeath.$errors.map(e => e.$message)"
                  @blur="v$.dateOfDeath.$touch"
                  outlined
                />
                <v-text-field
                  v-model="state.deathTime"
                  label="Čas úmrtí"
                  type="time"
                  :error-messages="v$.deathTime.$errors.map(e => e.$message)"
                  @blur="v$.deathTime.$touch"
                  outlined
                />
                <v-text-field
                  v-model="state.deathPlace"
                  label="Místo úmrtí"
                  :error-messages="v$.deathPlace.$errors.map(e => e.$message)"
                  @blur="v$.deathPlace.$touch"
                  outlined
                />
                <v-text-field
                  v-model="state.causeOfDeath"
                  label="Příčina smrti"
                  :error-messages="v$.causeOfDeath.$errors.map(e => e.$message)"
                  @blur="v$.causeOfDeath.$touch"
                  outlined
                />
                <v-text-field
                  v-model="state.burialDate"
                  label="Datum pohřbu"
                  type="date"
                  :error-messages="v$.burialDate.$errors.map(e => e.$message)"
                  @blur="v$.burialDate.$touch"
                  outlined
                />
                <v-text-field
                  v-model="state.burialPlace"
                  label="Místo pohřbu"
                  :error-messages="v$.burialPlace.$errors.map(e => e.$message)"
                  @blur="v$.burialPlace.$touch"
                  outlined
                />
                <v-text-field
                  v-model="state.internmentPlace"
                  label="Místo pochování"
                  :error-messages="v$.internmentPlace.$errors.map(e => e.$message)"
                  @blur="v$.internmentPlace.$touch"
                  outlined
                />
              </div>
            </section>
          </template>
          <section class="mb-6">
            <h2 class="mb-2 text-lg font-bold border-b pb-1">Rodinné vazby a další informace</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <v-select
                v-model="state.motherId"
                :items="personsItems"
                label="Matka"
                item-title="text"
                item-value="value"
                :return-object="false"
                outlined
                clearable
              />
              <v-select
                v-model="state.fatherId"
                :items="personsItems"
                label="Otec"
                item-title="text"
                item-value="value"
                :error-messages="v$.fatherId.$errors.map(e => e.$message)"
                @blur="v$.fatherId.$touch"
                outlined
                clearable
              />
            </div>
            <v-text-field
              v-model="state.hobbies"
              label="Koníčky a zájmy"
              :error-messages="v$.hobbies.$errors.map(e => e.$message)"
              @blur="v$.hobbies.$touch"
              outlined
              class="mt-4"
            />
            <v-textarea
              v-model="state.shortMessage"
              label="Krátký vzkaz"
              rows="2"
              :error-messages="v$.shortMessage.$errors.map(e => e.$message)"
              @blur="v$.shortMessage.$touch"
              outlined
              class="mt-4"
            />
          </section>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="submitForm">Uložit</v-btn>
        <v-btn text @click="closeDialog">Zrušit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { defineProps, defineEmits, defineExpose } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@/utils/i18n-validators'
import { createI18nMessage } from '@vuelidate/validators'
import { i18n } from '@/i18n'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'
import type { FamilyMember, UpdateFamilyMemberPayload } from '@/interfaces/familyMembers'
import { FamilyMembersService } from '@/services/FamilyMemberService'
import { useSnackbar } from '@/composables/useSnackbar'

const { showSnackbar } = useSnackbar()

const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

const isoToDateLocal = (iso: string): string => {
  if (!iso) return ''
  const d = new Date(iso)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const isoToTimeLocal = (iso: string): string => {
  if (!iso) return ''
  const d = new Date(iso)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

const convertLocalTimeToUTCString = (time: string): string => {
  if (!time || !/^\d{2}:\d{2}$/.test(time)) return ''
  const [hours, minutes] = time.split(':').map(Number)
  const localDate = new Date()
  localDate.setHours(hours, minutes, 0, 0)
  const isoString = localDate.toISOString()
  return isoString.split('T')[1].split('.')[0]
}

const props = defineProps<{ memberId: string }>()
const emit = defineEmits(['memberUpdated'])
const familyStore = useFamilyMembersStore()

const familyMember = computed<FamilyMember | null>(() => {
  if (familyStore.familyMemberDetail && familyStore.familyMemberDetail.id === props.memberId) {
    return familyStore.familyMemberDetail
  }
  return null
})

const dialog = ref(false)

const state = reactive({
  profilePhoto: null as File | null,
  firstName: '',
  lastName: '',
  shortDescription: '',
  birthLastName: '',
  dateOfBirth: '',
  birthPlace: '',
  birthTime: '',
  gender: '',
  religion: '',
  profession: '',
  isAlive: true,
  dateOfDeath: '',
  deathTime: '',
  deathPlace: '',
  causeOfDeath: '',
  burialDate: '',
  burialPlace: '',
  internmentPlace: '',
  motherId: '',
  fatherId: '',
  hobbies: '',
  shortMessage: ''
})

const notAfterToday = withI18nMessage((value: string) => {
  if (!value) return true
  return new Date(value) <= new Date()
}, { message: 'Datum nesmí být pozdější než dnešní.' })

const birthBeforeDeath = withI18nMessage((value: string, vm: any) => {
  if (!value || !vm.dateOfBirth) return true
  return new Date(vm.dateOfBirth) <= new Date(value)
}, { message: 'Datum narození musí být dřívější než datum úmrtí.' })

const emptyIfAlive = withI18nMessage((value: any, vm: any) => {
  return vm.isAlive ? (!value || value === '') : true
}, { message: 'Tato hodnota nesmí být zadána, pokud je osoba naživu.' })

const differentFromMother = withI18nMessage((value: any, vm: any) => {
  if (!value || !vm.motherId) return true
  return value !== vm.motherId
}, { message: 'Matka a otec musí být rozdílné osoby.' })

const rules = {
  firstName: { required, maxLength: maxLength(100) },
  lastName: { required, maxLength: maxLength(100) },
  dateOfBirth: { notAfterToday },
  dateOfDeath: { notAfterToday, birthBeforeDeath, emptyIfAlive },
  birthLastName: { maxLength: maxLength(100) },
  birthPlace: { maxLength: maxLength(250) },
  religion: { maxLength: maxLength(100) },
  deathTime: { emptyIfAlive },
  deathPlace: { maxLength: maxLength(250), emptyIfAlive },
  causeOfDeath: { maxLength: maxLength(100), emptyIfAlive },
  burialDate: { emptyIfAlive },
  burialPlace: { maxLength: maxLength(250), emptyIfAlive },
  internmentPlace: { maxLength: maxLength(250), emptyIfAlive },
  profession: { maxLength: maxLength(1000) },
  hobbies: { maxLength: maxLength(1000) },
  shortDescription: { maxLength: maxLength(2000) },
  shortMessage: { maxLength: maxLength(2000) },
  fatherId: { differentFromMother }
}

const v$ = useVuelidate(rules, state)

const personsItems = computed(() =>
  familyStore.allMinifiedFamilyMembers
    .filter(member => member.id !== props.memberId)
    .map(member => ({
      text: `${member.firstName} ${member.lastName} (nar. ${member.dateOfBirth ? isoToDateLocal(member.dateOfBirth) : '-'})`,
      value: member.id
    }))
)

const genderItems = ['female', 'male', 'other']

const resetForm = () => {
  if (!familyMember.value) return
  state.firstName = familyMember.value.firstName
  state.lastName = familyMember.value.lastName
  state.shortDescription = familyMember.value.shortDescription
  state.birthLastName = familyMember.value.birthLastName
  state.dateOfBirth = isoToDateLocal(familyMember.value.dateOfBirth)
  state.birthPlace = familyMember.value.birthPlace
  state.birthTime = isoToTimeLocal(familyMember.value.birthTime)
  state.gender = familyMember.value.gender
  state.religion = familyMember.value.religion
  state.profession = familyMember.value.profession
  state.isAlive = !familyMember.value.deceased
  state.dateOfDeath = isoToDateLocal(familyMember.value.dateOfDeath)
  state.deathTime = isoToTimeLocal(familyMember.value.deathTime)
  state.deathPlace = familyMember.value.deathPlace
  state.causeOfDeath = familyMember.value.causeOfDeath
  state.burialDate = isoToDateLocal(familyMember.value.burialDate)
  state.burialPlace = familyMember.value.burialPlace
  state.internmentPlace = familyMember.value.internmentPlace
  const motherRel = familyMember.value.relationShipTree.find(r => r.relationship === 'mother')
  state.motherId = personsItems.value.find(p => p.value == motherRel?.id)
  const fatherRel = familyMember.value.relationShipTree.find(r => r.relationship === 'father')
  state.fatherId = personsItems.value.find(p => p.value == fatherRel?.id)
  state.hobbies = familyMember.value.hobbiesAndInterests || ''
  state.shortMessage = familyMember.value.shortMessage
  state.profilePhoto = null
  v$.value.$reset()
}

onMounted(async () => {
  await familyStore.fetchMinifiedFamilyMembers()
  if (familyMember.value) {
    resetForm()
  }
})

watch(familyMember, (newMember) => {
  if (newMember) resetForm()
}, { immediate: true })

const onAliveChange = () => {
  if (state.isAlive) {
    state.dateOfDeath = ''
    state.deathTime = ''
    state.deathPlace = ''
    state.causeOfDeath = ''
    state.burialDate = ''
    state.burialPlace = ''
    state.internmentPlace = ''
  }
}

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const submitForm = async () => {
  const valid = await v$.value.$validate()
  if (!valid) return
  const utcBirthTime = state.birthTime ? convertLocalTimeToUTCString(state.birthTime) : ''
  const utcDeathTime = state.deathTime ? convertLocalTimeToUTCString(state.deathTime) : ''
  if (state.motherId && typeof state.motherId === 'object' && state.motherId.value) {
    state.motherId = state.motherId.value
  }
  if (state.fatherId && typeof state.fatherId === 'object' && state.fatherId.value) {
    state.fatherId = state.fatherId.value
  }
  const payload: UpdateFamilyMemberPayload = {
    data: {
      type: 'family-members',
      id: props.memberId,
      attributes: {
        'first-name': state.firstName,
        'last-name': state.lastName,
        'short-description': state.shortDescription,
        'birth-last-name': state.birthLastName,
        'birth-place': state.birthPlace,
        'birth-time': utcBirthTime,
        'date-of-birth': state.dateOfBirth,
        'gender': state.gender,
        'religion': state.religion,
        'profession': state.profession,
        'deceased': !state.isAlive,
        'date-of-death': state.dateOfDeath,
        'death-time': utcDeathTime,
        'death-place': state.deathPlace,
        'cause-of-death': state.causeOfDeath,
        'burial-date': state.burialDate,
        'burial-place': state.burialPlace,
        'internment-place': state.internmentPlace,
        'hobbies-and-interests': state.hobbies,
        'short-message': state.shortMessage
      },
      relationships: {
        mother: {
          data: { type: 'family-members', id: state.motherId }
        },
        father: {
          data: { type: 'family-members', id: state.fatherId }
        }
      }
    }
  }
  try {
    await FamilyMembersService.updateFamilyMember(props.memberId, payload)
    closeDialog()
    showSnackbar('Údaje byly upraveny.', 'success')
    emit('memberUpdated')
  } catch (error) {
    showSnackbar('Při ukládání změn došlo k chybě. Možná není možné, aby některá z vámi zadaných rodinných vazeb nastala.', 'error')
    console.error('Chyba při aktualizaci člena:', error)
  }
}

defineExpose({ openDialog, closeDialog, submitForm })
</script>

<style scoped>
</style>
