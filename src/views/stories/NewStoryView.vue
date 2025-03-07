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
              v-model:content="storyContent"
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
                    v-model="storyTitle"
                    label="Název příběhu"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" lg="6">
                  <v-select
                    v-model="selectedPersons"
                    :items="personsItems"
                    label="Koho se příběh týká"
                    multiple
                    chips
                    required
                    item-title="text"
                    item-value="value"
                    :return-object="false"
                  />
                </v-col>

                <v-col cols="12">
                  <v-radio-group v-model="dateType" row>
                    <v-radio label="Přesné datum" value="exact"></v-radio>
                    <v-radio label="Pouze rok" value="year"></v-radio>
                  </v-radio-group>
                </v-col>

                <v-col v-if="dateType === 'exact'">
                  <v-date-input
                    v-model="storyDate"
                    label="Vyberte datum"
                  ></v-date-input>
                </v-col>

                <v-col v-else-if="dateType === 'year'">
                  <v-text-field
                    v-model="storyYear"
                    label="Rok příběhu"
                    type="number"
                    min="0"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    v-model="isDateApprox"
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import AppLayout from '@/layouts/AppLayout.vue'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'
import { VDateInput } from 'vuetify/labs/VDateInput'
import BlotFormatter from 'quill-blot-formatter'
import { StoriesService } from '@/services/storiesService'
import type { NewStoryPayload } from '@/interfaces/stories'
import { useSnackbar } from '@/composables/useSnackbar'

const { showSnackbar } = useSnackbar()

const modules = {
  name: 'blotFormatter',
  module: BlotFormatter
}

const storyTitle = ref('')
const storyContent = ref('')
const selectedPersons = ref<string[]>([])
const storyDate = ref(null)
const storyYear = ref('')
const dateType = ref('exact')
const isDateApprox = ref(false)
const personId = ref<string>('')

const quillRef = ref<any>(null)

const familyStore = useFamilyMembersStore()
onMounted(() => {
  if (!familyStore.familyMembers.length) {
    familyStore.fetchFamilyMembers()
  }

  const route = useRoute()
  personId.value = route.query.person as string
  if (personId.value) {
    selectedPersons.value = [personId.value]
  } else {
    router.push('/')
  }
})

const personsItems = computed(() =>
  familyStore.familyMembers.map(person => ({
    text: `${person.firstName} ${person.lastName} (nar. ${person.dateOfBirth ? person.dateOfBirth : '-'})`,
    value: person.id
  }))
)

const focusEditor = () => {
  const editor = quillRef.value?.editor;
  if (editor) {
    const length = editor.getLength();
    editor.focus();
    editor.setSelection(length, 0);
  }
};

const publishStory = async () => {
  const payload: NewStoryPayload = {
    data: {
      type: 'stories',
      attributes: {
        title: storyTitle.value,
        content: storyContent.value,
        date_type: dateType.value,
        story_date: dateType.value === 'exact' ? storyDate.value || '' : undefined,
        story_year: dateType.value === 'year' ? storyYear.value : undefined,
        is_date_approx: isDateApprox.value,
      },
      relationships: {
        family_members: {
          data: selectedPersons.value.map(id => ({
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
