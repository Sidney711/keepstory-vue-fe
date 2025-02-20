<template>
  <v-dialog v-model="dialog" max-width="90%">
    <v-card>
      <v-card-title class="headline">Editace člena rodiny</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <section class="mb-6">
            <h2 class="mb-2 text-lg font-bold border-b pb-1">Základní informace</h2>
            <v-file-input
              v-model="state.profilePhoto"
              @change="uploadProfilePicture"
              label="Profilová fotka"
              accept="image/*"
              prepend-icon="mdi-image"
              outlined
              class="mb-4"
            />
            <div v-if="currentProfilePicture" class="mb-4">
              <v-img :src="BACKEND_URL + currentProfilePicture" height="200px"></v-img>
              <v-btn color="error" @click="deleteProfilePicture">Smazat fotku</v-btn>
            </div>

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
              label="Krátký popis osoby"
              rows="2"
              outlined
              class="mb-4"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <v-text-field
                v-model="state.birthLastName"
                label="Rodné příjmení"
                outlined
              />
              <v-text-field
                v-model="state.dateOfBirth"
                label="Datum narození"
                type="date"
                outlined
              />
              <v-text-field
                v-model="state.birthPlace"
                label="Místo narození"
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
              />
              <v-text-field
                v-model="state.religion"
                label="Náboženství"
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
                  outlined
                />
                <v-text-field
                  v-model="state.deathTime"
                  label="Čas úmrtí"
                  type="time"
                  outlined
                />
                <v-text-field
                  v-model="state.deathPlace"
                  label="Místo úmrtí"
                  outlined
                />
                <v-text-field
                  v-model="state.causeOfDeath"
                  label="Příčina smrti"
                  outlined
                />
                <v-text-field
                  v-model="state.burialDate"
                  label="Datum pohřbu"
                  type="date"
                  outlined
                />
                <v-text-field
                  v-model="state.burialPlace"
                  label="Místo pohřbu"
                  outlined
                />
                <v-text-field
                  v-model="state.internmentPlace"
                  label="Místo pochování"
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
              />
              <v-select
                v-model="state.fatherId"
                :items="personsItems"
                label="Otec"
                item-title="text"
                item-value="value"
                outlined
              />
            </div>
            <v-text-field
              v-model="state.hobbies"
              label="Koníčky a zájmy"
              outlined
              class="mt-4"
            />
            <v-textarea
              v-model="state.shortMessage"
              label="Krátký vzkaz"
              rows="2"
              outlined
              class="mt-4"
            />
          </section>

          <section class="mb-6">
            <h2 class="mb-2 text-lg font-bold border-b pb-1">Dokumenty</h2>
            <v-file-input
              v-model="state.signature"
              label="Podpis"
              accept="image/*"
              prepend-icon="mdi-pencil"
              outlined
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
import { required } from '@vuelidate/validators'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'
import type { FamilyMember, UpdateFamilyMemberPayload } from '@/interfaces/familyMembers'
import { FamilyMembersService } from '@/services/FamilyMemberService.ts'
import { BACKEND_URL } from '@/env-constants.ts'

function isoToDateLocal(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function isoToTimeLocal(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function combineLocalDateAndTimeToUTC(date: string, time: string): string {
  if (!date) return ''
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)
  const localDate = new Date(year, month - 1, day, hours || 0, minutes || 0)
  return localDate.toISOString()
}

const props = defineProps<{ memberId: string }>()
const emit = defineEmits(['memberUpdated'])
const familyStore = useFamilyMembersStore()

const familyMember = computed<FamilyMember | null>(() =>
  familyStore.familyMembers.find(m => m.id === props.memberId) || null
)

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
  isAlive: true,
  dateOfDeath: '',
  deathTime: '',
  deathPlace: '',
  causeOfDeath: '',
  burialDate: '',
  burialPlace: '',
  internmentPlace: '',
  motherId: '' as string,
  fatherId: '' as string,
  hobbies: '',
  shortMessage: '',
  signature: null as File | null
})

const rules = {
  firstName: { required },
  lastName: { required }
}
const v$ = useVuelidate(rules, state)

const personsItems = computed(() =>
  familyStore.familyMembers
    .filter(member => member.id !== props.memberId)
    .map(member => ({
      text: `${member.firstName} ${member.lastName} (nar. ${member.dateOfBirth ? isoToDateLocal(member.dateOfBirth) : '-'})`,
      value: member.id
    }))
)

const genderItems = ['female', 'male', 'other']

function resetForm() {
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

  if (familyMember.value.dateOfDeath) {
    state.isAlive = false
    state.dateOfDeath = isoToDateLocal(familyMember.value.dateOfDeath)
    state.deathTime = isoToTimeLocal(familyMember.value.deathTime)
  } else {
    state.isAlive = true
    state.dateOfDeath = ''
    state.deathTime = ''
  }

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
  if (!familyMember.value) {
    await familyStore.fetchFamilyMembers()
  }
  if (familyMember.value) {
    resetForm()
  }
})

watch(familyMember, (newMember) => {
  if (newMember) resetForm()
}, { immediate: true })

function onAliveChange() {
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

const currentProfilePicture = computed(() => {
  return familyMember.value.profilePictureUrl;
})

function openDialog() {
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
  resetForm()
}

function convertLocalTimeToUTCString(date: string, time: string): string {
  if (!date || !time) return ''
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)
  const localDate = new Date(year, month - 1, day, hours, minutes)
  const isoString = localDate.toISOString()
  return isoString.split('T')[1].split('.')[0]
}


async function submitForm() {
  const valid = await v$.value.$validate()
  if (!valid) return

  const utcBirthTime = state.birthTime ? convertLocalTimeToUTCString(state.dateOfBirth, state.birthTime) : ''
  const utcDeathTime = state.deathTime ? convertLocalTimeToUTCString(state.dateOfDeath, state.deathTime) : ''

  if (state.motherId) {
    if (state.motherId.value) {
      state.motherId = state.motherId.value
    }
  }

  if (state.fatherId) {
    if (state.fatherId.value) {
      state.fatherId = state.fatherId.value
    }
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
          data: { type: "family-members", id: +state.motherId }
        },
        father: {
          data: { type: "family-members", id: +state.fatherId }
        }
      }
    }
  }

  try {
    console.log('Payload pro update:', payload)
    await FamilyMembersService.updateFamilyMember(props.memberId, payload)
    closeDialog()
    emit('memberUpdated')
  } catch (error) {
    console.error('Chyba při aktualizaci člena:', error)
  }
}

async function deleteProfilePicture() {
  try {
    await FamilyMembersService.deleteProfilePicture(props.memberId)
    closeDialog()
    emit('memberUpdated')
  } catch (error) {
    console.error('Chyba při mazání profilové fotky:', error)
  }
}

async function uploadProfilePicture() {
  if (!state.profilePhoto) return;

  try {
    const formData = new FormData();
    formData.append('data[type]', 'family-members');
    formData.append('data[id]', props.memberId);
    formData.append('data[attributes][profile_picture]', state.profilePhoto);

    await FamilyMembersService.updateProfilePicture(props.memberId, formData);
    closeDialog();
    emit('memberUpdated');
  } catch (error) {
    console.error('Chyba při aktualizaci profilové fotky:', error);
  }
}

defineExpose({ openDialog, closeDialog, submitForm, deleteProfilePicture })
</script>

<style scoped>
</style>
