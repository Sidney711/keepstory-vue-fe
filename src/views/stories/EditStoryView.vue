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
            <v-card-title>Upravit příběh</v-card-title>
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
              <v-btn color="primary" @click="updateStory">
                Uložit změny
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
const storyId = ref<string>('')

const quillRef = ref<any>(null)

const familyStore = useFamilyMembersStore()
const route = useRoute()

onMounted(async () => {
  await familyStore.fetchMinifiedFamilyMembers()

  personId.value = route.query.person as string
  storyId.value = route.params.id as string

  if (!personId.value || !storyId.value) {
    router.push('/')
    return
  }

  try {
    const response = await StoriesService.fetchStory(storyId.value)
    const attrs = response.data.data.attributes
    storyTitle.value = attrs.title
    storyContent.value = attrs.content
    dateType.value = attrs['date-type'] || 'exact'
    if (dateType.value === 'exact') {
      storyDate.value = attrs['story-date']
    } else {
      storyYear.value = attrs['story-year']
    }
    isDateApprox.value = attrs['is-date-approx']
    selectedPersons.value = response.data.included.map((item: any) => item.id)
  } catch (error) {
    console.error('Chyba při načítání příběhu:', error)
    router.push('/')
  }
})

const personsItems = computed(() =>
  familyStore.allMinifiedFamilyMembers.map(person => ({
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

const updateStory = async () => {
  const payload: NewStoryPayload = {
    data: {
      type: 'stories',
      id: storyId.value,
      attributes: {
        title: storyTitle.value,
        content: storyContent.value,
        "date-type": dateType.value,
        "story-date": dateType.value === 'exact' ? storyDate.value || '' : undefined,
        "story-year": dateType.value === 'year' ? storyYear.value : undefined,
        "is-date-approx": isDateApprox.value,
      },
      relationships: {
        "family-members": {
          data: selectedPersons.value.map(id => ({
            type: 'family-members',
            id,
          })),
        },
      },
    },
  }
  try {
    await StoriesService.updateStory(storyId.value, payload)
    showSnackbar('Příběh byl úspěšně aktualizován.', 'success')
    await router.push('/story-detail/' + storyId.value + '?person=' + personId.value)
  } catch (error) {
    showSnackbar('Chyba při aktualizaci příběhu.', 'error')
    console.error('Chyba při aktualizaci příběhu:', error)
  }
}


</script>

<style scoped>
</style>
