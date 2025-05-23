<template>
  <AppLayout>
    <v-container class="py-4" fluid>
      <v-btn color="red" variant="tonal" class="mb-4" @click="openCreateModal" data-testid="open-create-modal-button">
        {{ t('family.button.create') }}
      </v-btn>

      <div v-if="familyStore.loading" class="mb-4">
        {{ t('family.loading') }}
      </div>
      <div v-if="familyStore.error" class="text-red-500 mb-4">
        {{ familyStore.error }}
      </div>
      <div class="container mx-auto">
        <v-container fluid>
          <v-row justify="center" align="center" class="mb-4" style="gap: 16px;">
            <v-col cols="12" sm="7" md="5">
              <v-text-field
                v-model="searchInput"
                :label="t('family.search')"
                append-icon="mdi-magnify"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-select
                v-model="sortOrder"
                :items="sortOptions"
                :label="t('family.sortByDOB')"
                outlined
                dense
                item-title="text"
                item-value="value"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="member in familyStore.familyMembers"
              :key="member.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  :elevation="hover ? 12 : 2"
                  class="mx-auto cursor-pointer flex flex-col h-full"
                  outlined
                  :to="{ name: 'family-member-detail', params: { id: member.id } }"
                >
                  <div class="flex justify-center mt-4">
                    <img
                      v-if="member.profilePictureUrl"
                      :src="BACKEND_URL + member.profilePictureUrl"
                      alt="Profilový obrázek"
                      class="h-48 w-48 rounded-full object-cover"
                    />
                    <img
                      v-else
                      src="/avatar-blank.png"
                      alt="Profilový obrázek"
                      class="h-48 w-48 rounded-full object-cover"
                    />
                  </div>
                  <v-card-title class="text-h6 justify-center">
                    {{ member.firstName }} {{ member.lastName }}
                  </v-card-title>
                  <v-card-text class="flex-grow">
                    <p>
                      {{ t('family.label.dateOfBirth') }}: {{ member.dateOfBirth }}
                    </p>
                    <p v-if="member.dateOfDeath">
                      {{ t('family.label.dateOfDeath') }}:
                      <span>{{ member.dateOfDeath }}</span>
                    </p>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>

        <v-pagination
          v-model="familyStore.page"
          :length="familyStore.totalPages"
          class="mt-4"
        ></v-pagination>

        <FamilyMemberCreateModal @memberCreated="onMemberCreated" ref="createModal" />
      </div>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLayout from '@/layouts/AppLayout.vue'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'
import FamilyMemberCreateModal from '@/components/family-member/FamilyMemberCreateModal.vue'
import { BACKEND_URL } from '@/env-constants.ts'

const { t } = useI18n()
const familyStore = useFamilyMembersStore()

const searchInput = ref(familyStore.search)
const sortOrder = ref(familyStore.sortOrder || 'asc')

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  familyStore.fetchFamilyMembers()
})

watch(searchInput, () => {
  familyStore.search = searchInput.value
  familyStore.page = 1

  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  debounceTimeout = setTimeout(() => {
    familyStore.fetchFamilyMembers()
  }, 500)
})

watch(sortOrder, (newVal) => {
  familyStore.sortOrder = newVal
  familyStore.page = 1
  familyStore.fetchFamilyMembers()
})

watch(() => familyStore.page, () => {
  familyStore.fetchFamilyMembers()
})

const sortOptions = [
  { text: t('family.sortOptions.oldest'), value: 'asc' },
  { text: t('family.sortOptions.youngest'), value: 'desc' }
]

const createModal = ref(null)
const openCreateModal = () => {
  if (createModal.value) {
    createModal.value.openDialog()
  }
}

const onMemberCreated = () => {
  familyStore.fetchFamilyMembers()
}
</script>

<style scoped>
</style>
