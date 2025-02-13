<template>
  <AppLayout>
    <v-container class="py-4" fluid>
      <v-btn color="primary" class="mb-4" to="/">
        Zpět na rodinu
      </v-btn>

      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <template v-if="familyStore.loading">
            <v-progress-circular indeterminate color="primary" class="mx-auto" />
          </template>

          <template v-else-if="familyStore.error">
            <v-alert type="error" dismissible>
              {{ familyStore.error }}
            </v-alert>
          </template>

          <template v-else-if="member">
            <v-card>
              <v-img src="/avatar-blank.png" height="300px" alt="Profilový obrázek" />

              <v-card-title>
                <div class="flex gap-2 pb-2">
                  <v-btn icon @click="editMember">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteMember">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn icon @click="exportMember">
                    <v-icon>mdi-file-pdf-box</v-icon>
                  </v-btn>
                </div>
                <div class="text-h4">{{ member.firstName }} {{ member.lastName }}</div>
              </v-card-title>

              <v-card-subtitle>
                {{ t('family.label.dateOfBirth') }}: {{ member.dateOfBirth }}
                <template v-if="member.dateOfDeath">
                  <br />
                  {{ t('family.label.dateOfDeath') }}: {{ member.dateOfDeath }}
                </template>
              </v-card-subtitle>
              <v-card-text>
                <p>Doplňující informace o členu rodiny.</p>
              </v-card-text>
            </v-card>
          </template>

          <template v-else>
            <v-alert type="warning">
              Člen rodiny nebyl nalezen.
            </v-alert>
          </template>
        </v-col>
      </v-row>

      <v-tabs v-model="activeTab" background-color="grey lighten-4" class="mt-4" grow>
        <v-tab value="info">Základní informace</v-tab>
        <v-tab value="docs">Dokumenty</v-tab>
        <v-tab value="gallery">Galerie</v-tab>
        <v-tab value="stories">Příběhy</v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <v-tab-item value="info">
          <v-card flat v-if="activeTab === 'info'">
            <v-card-text>
              Zde patří základní informace
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="docs">
          <v-card flat v-if="activeTab === 'docs'">
            <v-card-text>
              Zde patří dokumenty
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="gallery">
          <v-card flat v-if="activeTab === 'gallery'">
            <v-card-text>
              Zde patří galerie
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="stories">
          <v-card flat v-if="activeTab === 'stories'">
            <v-card-text>
              <div class="flex justify-end mb-4">
                <v-btn color="primary" @click="addStory">
                  <v-icon left>mdi-plus</v-icon>
                  Nový příběh
                </v-btn>
              </div>

              <div>
                <v-card
                  v-for="story in stories"
                  :key="story.id"
                  outlined
                  class="mb-3 rounded-lg hover:shadow-lg cursor-pointer"
                  @click="goToStoryDetail(story.id)"
                >
                  <v-card-text class="flex items-center justify-between">
                    <div>
                      <div class="text-h6 font-medium">{{ story.title }}</div>
                      <div class="text-body-2 text-gray-600">{{ story.date }}</div>
                    </div>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-card-text>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppLayout from '@/layouts/AppLayout.vue'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const familyStore = useFamilyMembersStore()

const memberId = route.params.id as string

const member = computed(() => {
  return familyStore.familyMembers.find((m) => m.id === memberId)
})

onMounted(() => {
  if (!member.value) {
    familyStore.fetchFamilyMembers()
  }
})

const activeTab = ref('info')

const editMember = () => {
  console.log("Edit member:", member.value)
}

const deleteMember = () => {
  console.log("Delete member:", member.value)
}

const exportMember = () => {
  console.log("Export member:", member.value)
}

interface Story {
  id: string
  title: string
  date: string
}

const stories = ref<Story[]>([
  { id: '1', title: 'První příběh', date: '2025-01-01' },
  { id: '2', title: 'Druhý příběh', date: '2025-02-15' },
  { id: '3', title: 'Třetí příběh', date: '2025-03-10' }
])

const addStory = () => {
  if (member.value) {
    router.push({ name: 'new-story', query: { person: member.value.id } })
  } else {
    router.push({ name: 'new-story' })
  }
}

const goToStoryDetail = (id: string) => {
  console.log('Navigace do detailu příběhu s id:', id)
}
</script>

<style scoped>
</style>
