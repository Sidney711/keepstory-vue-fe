<template>
  <AppLayout>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="8">
          <div>
            <QuillEditor theme="snow" toolbar="full" class="min-h-[calc(80vh)]" />
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
import AppLayout from '@/layouts/AppLayout.vue'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'
import { VDateInput } from 'vuetify/labs/VDateInput'

const storyTitle = ref('')
const selectedPersons = ref([])
const storyDate = ref(null)
const storyYear = ref('')
const dateType = ref('exact')
const isDateApprox = ref(false)

const familyStore = useFamilyMembersStore()
onMounted(() => {
  familyStore.fetchFamilyMembers()
})

const personsItems = computed(() =>
  familyStore.familyMembers.map(person => ({
    text: `${person.firstName} ${person.lastName} (nar. ${person.dateOfBirth ? person.dateOfBirth : '-'})`,
    value: person.id
  }))
)

const publishStory = () => {
  const payload = {
    title: storyTitle.value,
    persons: selectedPersons.value,
    dateType: dateType.value,
    date: dateType.value === 'exact' ? storyDate.value : storyYear.value,
    isDateApprox: isDateApprox.value,
  }
}
</script>

<style scoped>
</style>
