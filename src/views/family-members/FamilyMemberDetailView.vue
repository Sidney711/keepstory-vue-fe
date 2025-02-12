<template>
  <AppLayout>
    <v-container class="py-4">
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
              Zde patří příběhy
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppLayout from '@/layouts/AppLayout.vue'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'

const { t } = useI18n()
const route = useRoute()
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
</script>

<style scoped>
</style>
