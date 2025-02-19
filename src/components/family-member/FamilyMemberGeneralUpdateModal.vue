<template>
  <v-dialog v-model="dialog" max-width="90%">
    <v-card>
      <v-card-title class="headline">Editace člena rodiny</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <div class="mb-6">
            <div class="mb-2 text-lg font-bold border-b pb-1">Základní informace</div>

            <v-file-input
              v-model="state.profilePhoto"
              label="Profilová fotka"
              accept="image/*"
              prepend-icon="mdi-image"
              outlined
              class="mb-4"
            ></v-file-input>

            <v-text-field
              v-model="state.firstName"
              label="Jméno"
              :error-messages="v$.firstName.$errors.map(e => e.$message)"
              @blur="v$.firstName.$touch"
              required
              outlined
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="state.lastName"
              label="Příjmení"
              :error-messages="v$.lastName.$errors.map(e => e.$message)"
              @blur="v$.lastName.$touch"
              required
              outlined
              class="mb-4"
            ></v-text-field>

            <v-textarea
              v-model="state.shortDescription"
              label="Krátký popis osoby"
              rows="2"
              outlined
              class="mb-4"
            ></v-textarea>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <v-text-field
                v-model="state.birthLastName"
                label="Rodné příjmení"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="state.dateOfBirth"
                label="Datum narození"
                type="date"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="state.birthPlace"
                label="Místo narození"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="state.birthTime"
                label="Čas narození"
                type="time"
                outlined
              ></v-text-field>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <v-select
                v-model="state.gender"
                :items="genderItems"
                label="Pohlaví"
                outlined
              ></v-select>
              <v-text-field
                v-model="state.religion"
                label="Náboženství"
                outlined
              ></v-text-field>
            </div>
          </div>

          <v-checkbox
            v-model="state.isAlive"
            label="Žije osoba"
            @change="onAliveChange"
            class="mt-4"
          ></v-checkbox>

          <template v-if="!state.isAlive">
            <div class="mb-6">
              <div class="mb-2 text-lg font-bold border-b pb-1">Informace o úmrtí</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <v-text-field
                  v-model="state.dateOfDeath"
                  label="Datum úmrtí"
                  type="date"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="state.deathTime"
                  label="Čas úmrtí"
                  type="time"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="state.deathPlace"
                  label="Místo úmrtí"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="state.causeOfDeath"
                  label="Příčina smrti"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="state.burialDate"
                  label="Datum pohřbu"
                  type="date"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="state.burialPlace"
                  label="Místo pohřbu"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="state.internmentPlace"
                  label="Místo pochování"
                  outlined
                ></v-text-field>
              </div>
            </div>
          </template>

          <div class="mb-6">
            <div class="mb-2 text-lg font-bold border-b pb-1">Rodinné vazby a další informace</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <v-select
                v-model="state.motherId"
                :items="familyMembersSelect"
                label="Matka"
                item-text="name"
                item-value="id"
                outlined
              ></v-select>
              <v-select
                v-model="state.fatherId"
                :items="familyMembersSelect"
                label="Otec"
                item-text="name"
                item-value="id"
                outlined
              ></v-select>
            </div>
            <v-text-field
              v-model="state.hobbies"
              label="Koníčky a zájmy"
              outlined
              class="mt-4"
            ></v-text-field>
            <v-textarea
              v-model="state.shortMessage"
              label="Krátký vzkaz"
              rows="2"
              outlined
              class="mt-4"
            ></v-textarea>
          </div>

          <div class="mb-6">
            <div class="mb-2 text-lg font-bold border-b pb-1">Dokumenty</div>
            <v-file-input
              v-model="state.signature"
              label="Podpis"
              accept="image/*"
              prepend-icon="mdi-pencil"
              outlined
            ></v-file-input>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submitForm">Uložit</v-btn>
        <v-btn text @click="closeDialog">Zrušit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { defineEmits } from 'vue'

const emit = defineEmits(['memberUpdated'])

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
  motherId: '',
  fatherId: '',
  hobbies: '',
  shortMessage: '',
  signature: null as File | null
})

const rules = {
  firstName: { required },
  lastName: { required }
}

const v$ = useVuelidate(rules, state)

const genderItems = ['female', 'male', 'other']

const familyMembersSelect = computed(() => {
  return [
    { id: '1', name: 'Eva Nováková' },
    { id: '2', name: 'Petr Novák' }
    // ...
  ]
})

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  // Reset stavu
  state.profilePhoto = null
  state.firstName = ''
  state.lastName = ''
  state.shortDescription = ''
  state.birthLastName = ''
  state.dateOfBirth = ''
  state.birthPlace = ''
  state.birthTime = ''
  state.gender = ''
  state.religion = ''
  state.isAlive = true
  state.dateOfDeath = ''
  state.deathTime = ''
  state.deathPlace = ''
  state.causeOfDeath = ''
  state.burialDate = ''
  state.burialPlace = ''
  state.internmentPlace = ''
  state.motherId = ''
  state.fatherId = ''
  state.hobbies = ''
  state.shortMessage = ''
  state.signature = null
  v$.value.$reset()
}

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

const submitForm = async () => {
  const valid = await v$.value.$validate()
  if (!valid) return

  const payload = {
    profile_photo: state.profilePhoto,
    first_name: state.firstName,
    last_name: state.lastName,
    short_description: state.shortDescription,
    birth_last_name: state.birthLastName,
    date_of_birth: state.dateOfBirth,
    birth_place: state.birthPlace,
    birth_time: state.birthTime,
    gender: state.gender,
    religion: state.religion,
    is_alive: state.isAlive,
    date_of_death: state.isAlive ? null : state.dateOfDeath,
    death_time: state.isAlive ? null : state.deathTime,
    death_place: state.isAlive ? null : state.deathPlace,
    cause_of_death: state.isAlive ? null : state.causeOfDeath,
    burial_date: state.isAlive ? null : state.burialDate,
    burial_place: state.isAlive ? null : state.burialPlace,
    internment_place: state.isAlive ? null : state.internmentPlace,
    mother_id: state.motherId,
    father_id: state.fatherId,
    hobbies: state.hobbies,
    short_message: state.shortMessage,
    signature: state.signature
  }

  try {
    console.log('Payload pro update:', payload)
    closeDialog()
    emit('memberUpdated')
  } catch (error) {
    console.error('Chyba při aktualizaci člena:', error)
  }
}

defineExpose({ openDialog, closeDialog, submitForm })
</script>

<style scoped>
</style>
