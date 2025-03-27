<template>
  <AppLayout>
    <v-container fluid class="py-4">
      <v-btn color="red" variant="tonal" class="mb-4" :to="'/family-member-detail/' + personId">
        {{ t('family.backToMember') }}
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
            <v-card-title>{{ t('story.editTitle') }}</v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" lg="6">
                  <v-text-field
                    v-model="storyState.storyTitle"
                    :label="t('story.label.title')"
                    :error-messages="v$.storyTitle.$errors.map(e => e.$message)"
                    @blur="v$.storyTitle.$touch"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-select
                    v-model="storyState.selectedPersons"
                    :items="personsItems"
                    :label="t('story.label.targetMembers')"
                    multiple
                    chips
                    :rules="[v => (v && v.length > 0) || t('story.validation.atLeastOneMember')]"
                    required
                    item-title="text"
                    item-value="value"
                    :return-object="false"
                  />
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="storyState.dateType" row @change="resetDates">
                    <v-radio :label="t('story.radio.exactDate')" value="exact"></v-radio>
                    <v-radio :label="t('story.radio.yearOnly')" value="year"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col v-if="storyState.dateType === 'exact'">
                  <v-text-field
                    v-model="storyState.storyDate"
                    :label="t('story.label.selectDate')"
                    type="date"
                    :error-messages="v$.storyDate.$errors.map(e => e.$message)"
                    @blur="v$.storyDate.$touch"
                  ></v-text-field>
                </v-col>
                <v-col v-else-if="storyState.dateType === 'year'">
                  <v-text-field
                    v-model="storyState.storyYear"
                    :label="t('story.label.year')"
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
                    :label="t('story.label.dateApproximation')"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" variant="tonal" @click="updateStory">
                {{ t('story.button.saveChanges') }}
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { showSnackbar } = useSnackbar()
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

const modules = {
  name: 'blotFormatter',
  module: BlotFormatter
}

const personId = ref<string>('')
const storyId = ref<string>('')

const route = useRoute()
const familyStore = useFamilyMembersStore()

const storyState = reactive({
  storyTitle: '',
  storyContent: '',
  selectedPersons: [] as string[],
  dateType: 'exact',
  storyDate: '',
  storyYear: '',
  isDateApprox: false
})

// Validátory
const notInFuture = withI18nMessage((value: string) => {
  if (!value) return true
  return new Date(value) <= new Date()
}, { message: t('story.validation.futureDate') })

const validYear = withI18nMessage((value: string) => {
  if (value === '0' || value === 0) return true
  if (!value) return true
  const num = parseInt(value)
  const currentYear = new Date().getFullYear()
  return (num >= 0 && num <= currentYear)
}, { message: t('story.validation.validYear') })

const emptyIfExact = withI18nMessage((value: string, vm: any) => {
  return vm.dateType === 'exact' ? (value === '' || value == null) : true
}, { message: t('story.validation.emptyIfExact') })

const emptyIfYear = withI18nMessage((value: string, vm: any) => {
  return vm.dateType === 'year' ? (value === '' || value == null) : true
}, { message: t('story.validation.emptyIfYear') })

const rules = {
  storyTitle: { required, maxLength: maxLength(255) },
  storyDate: { notInFuture, emptyIfYear },
  storyYear: { validYear, emptyIfExact },
  selectedPersons: {
    required: (value: any) =>
      (Array.isArray(value) && value.length > 0) || t('story.validation.atLeastOneMember')
  }
}

const v$ = useVuelidate(rules, storyState)

const personsItems = computed(() =>
  familyStore.allMinifiedFamilyMembers.map(person => ({
    text: `${person.firstName} ${person.lastName} (${t('family.text.birthDate')} ${person.dateOfBirth || '-'})`,
    value: person.id
  }))
)

const quillRef = ref<any>(null)
const focusEditor = () => {
  const editor = quillRef.value?.editor
  if (editor) {
    const length = editor.getLength()
    editor.focus()
    editor.setSelection(length, 0)
  }
}

onMounted(async () => {
  await familyStore.fetchMinifiedFamilyMembers()
  personId.value = route.query.person as string
  storyId.value = route.params.id as string
  if (!personId.value || !storyId.value) {
    await router.push('/')
    return
  }
  try {
    const response = await StoriesService.fetchStory(storyId.value)
    const attrs = response.data.data.attributes
    storyState.storyTitle = attrs.title
    storyState.storyContent = attrs.content
    storyState.dateType = attrs['date-type'] || 'exact'
    if (storyState.dateType === 'exact') {
      storyState.storyDate = attrs['story-date']
    } else {
      storyState.storyYear = attrs['story-year']
    }
    storyState.isDateApprox = attrs['is-date-approx']
    storyState.selectedPersons = response.data.included.map((item: any) => item.id)
  } catch (error) {
    console.error('Chyba při načítání příběhu:', error)
    await router.push('/')
  }
})

const resetDates = () => {
  storyState.storyYear = ''
  storyState.storyDate = ''
}

const updateStory = async () => {
  if (storyState.selectedPersons == null || storyState.selectedPersons.length === 0) {
    return
  }
  v$.value.$touch()
  await v$.value.$validate()
  if (v$.value.$error) return
  const payload: NewStoryPayload = {
    data: {
      type: 'stories',
      id: storyId.value,
      attributes: {
        title: storyState.storyTitle,
        content: storyState.storyContent,
        "date-type": storyState.dateType,
        "story-date": storyState.dateType === 'exact' ? storyState.storyDate || '' : undefined,
        "story-year": storyState.dateType === 'year' ? storyState.storyYear : undefined,
        "is-date-approx": storyState.isDateApprox,
      },
      relationships: {
        "family-members": {
          data: storyState.selectedPersons.map(id => ({
            type: 'family_members',
            id,
          })),
        },
      },
    },
  }
  try {
    await StoriesService.updateStory(storyId.value, payload)
    showSnackbar(t('story.updateSuccess'), 'success')
    await router.push('/story-detail/' + storyId.value + '?person=' + personId.value)
  } catch (error) {
    showSnackbar(t('story.updateError'), 'error')
    console.error('Chyba při aktualizaci příběhu:', error)
  }
}

defineExpose({ updateStory })
</script>

<style scoped>
</style>
