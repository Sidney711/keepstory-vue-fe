<template>
  <AppLayout>
    <v-container fluid class="py-4">
      <v-btn color="primary" class="mb-4" :to="'/family-member-detail/' + personId">
        Zpět na člena rodiny
      </v-btn>
      <v-row>
        <v-col cols="12" md="8">
          <div @click="focusEditor" style="height: 80vh;">
            <QuillEditor
              ref="quillRef"
              v-model:content="storyState.storyContent"
              :modules="modules"
              content-type="html"
              theme="snow"
              toolbar="full"
              style="height: 100%;"
            />
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <v-card outlined class="mb-4">
            <v-card-title>Informace o příběhu</v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" lg="6">
                  <v-text-field
                    v-model="storyState.storyTitle"
                    label="Název příběhu"
                    :error-messages="v$.storyTitle.$errors.map(e => e.$message)"
                    @blur="v$.storyTitle.$touch"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-select
                    v-model="storyState.selectedPersons"
                    :items="personsItems"
                    label="Koho se příběh týká"
                    multiple
                    chips
                    :rules="[v => (v && v.length > 0) || 'Musí být vybrán alespoň jeden člen']"
                    required
                    item-title="text"
                    item-value="value"
                    :return-object="false"
                  />
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="storyState.dateType" row @change="resetDates">
                    <v-radio label="Přesné datum" value="exact"></v-radio>
                    <v-radio label="Pouze rok" value="year"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col v-if="storyState.dateType === 'exact'">
                  <v-text-field
                    v-model="storyState.storyDate"
                    label="Vyberte datum"
                    type="date"
                    :error-messages="v$.storyDate.$errors.map(e => e.$message)"
                    @blur="v$.storyDate.$touch"
                  ></v-text-field>
                </v-col>
                <v-col v-else-if="storyState.dateType === 'year'">
                  <v-text-field
                    v-model="storyState.storyYear"
                    label="Rok příběhu"
                    type="number"
                    min="0"
                    required
                    :error-messages="v$.storyYear.$errors.map(e => e.$message)"
                    @blur="v$.storyYear.$touch"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="storyState.isDateApprox"
                    label="Odhad datumu"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="publishStory">
                Publikovat příběh
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import AppLayout from '@/layouts/AppLayout.vue'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'
import BlotFormatter from 'quill-blot-formatter'
import { StoriesService } from '@/services/storiesService'
import type { NewStoryPayload } from '@/interfaces/stories'
import { useSnackbar } from '@/composables/useSnackbar'
import useVuelidate from '@vuelidate/core'
import { required, maxLength, createI18nMessage } from '@vuelidate/validators'
import { i18n } from '@/i18n'

const { showSnackbar } = useSnackbar()
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

const modules = {
  name: 'blotFormatter',
  module: BlotFormatter
}

const personId = ref<string>('')
const route = useRoute()
const familyStore = useFamilyMembersStore()

onMounted(async () => {
  await familyStore.fetchMinifiedFamilyMembers()
  personId.value = route.query.person as string
  if (!personId.value) {
    await router.push('/')
  } else if (!storyState.selectedPersons.length) {
    storyState.selectedPersons = [personId.value]
  }
})

const personsItems = computed(() =>
  familyStore.allMinifiedFamilyMembers.map(person => ({
    text: `${person.firstName} ${person.lastName} (nar. ${person.dateOfBirth || '-'})`,
    value: person.id
  }))
)

const storyState = reactive({
  storyTitle: '',
  storyContent: '',
  selectedPersons: [] as string[],
  dateType: 'exact', // "exact" nebo "year"
  storyDate: '',
  storyYear: '',
  isDateApprox: false
})

// Custom validátory s i18n zprávami
const notInFuture = withI18nMessage((value: string) => {
  if (!value) return true
  return new Date(value) <= new Date()
}, { message: 'Datum nesmí být v budoucnu.' })

const validYear = withI18nMessage((value: string) => {
  if (value === '0' || value === 0) return true
  if (!value) return true
  const num = parseInt(value)
  const currentYear = new Date().getFullYear()
  return (num >= 0 && num <= currentYear)
}, { message: 'Rok musí být nezáporný a nesmí být v budoucnu.' })

const emptyIfExact = withI18nMessage((value: string, vm: any) => {
  return vm.dateType === 'exact' ? (value === '' || value == null) : true
}, { message: 'Pro vybraný typ data nesmí být rok zadán.' })

const emptyIfYear = withI18nMessage((value: string, vm: any) => {
  return vm.dateType === 'year' ? (value === '' || value == null) : true
}, { message: 'Pro vybraný typ data nesmí být datum zadáno.' })

const rules = {
  storyTitle: { required, maxLength: maxLength(255) },
  storyDate: { notInFuture, emptyIfYear },
  storyYear: { validYear, emptyIfExact },
  selectedPersons: {
    required: (value: any) =>
      (Array.isArray(value) && value.length > 0) || 'Musí být vybrán alespoň jeden člen'
  }
}

const v$ = useVuelidate(rules, storyState)

const quillRef = ref<any>(null)
const focusEditor = () => {
  const editor = quillRef.value?.editor
  if (editor) {
    const length = editor.getLength()
    editor.focus()
    editor.setSelection(length, 0)
  }
}

const resetDates = () => {
  storyState.storyYear = ''
  storyState.storyDate = ''
}

const publishStory = async () => {
  if (storyState.selectedPersons == null || storyState.selectedPersons.length === 0) {
    return
  }
  v$.value.$touch()
  await v$.value.$validate()
  if (v$.value.$error) return
  const payload: NewStoryPayload = {
    data: {
      type: 'stories',
      attributes: {
        title: storyState.storyTitle,
        content: storyState.storyContent,
        date_type: storyState.dateType,
        story_date: storyState.dateType === 'exact' ? storyState.storyDate || '' : undefined,
        story_year: storyState.dateType === 'year' ? storyState.storyYear : undefined,
        is_date_approx: storyState.isDateApprox,
      },
      relationships: {
        family_members: {
          data: storyState.selectedPersons.map(id => ({
            type: 'family_members',
            id,
          })),
        },
      },
    },
  }
  try {
    const response = await StoriesService.createStory(payload)
    showSnackbar('Příběh byl úspěšně publikován.', 'success')
    await router.push('/story-detail/' + response.data.id + '?person=' + personId.value)
  } catch (error) {
    showSnackbar('Chyba při publikaci příběhu.', 'error')
    console.error('Chyba při publikaci příběhu:', error)
  }
}
</script>

<style scoped>
</style>
