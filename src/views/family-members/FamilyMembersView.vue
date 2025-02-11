<template>
  <AppLayout>
    <div class="container mx-auto px-4">
      <div v-if="familyStore.error" class="text-red-500 mb-4">
        {{ familyStore.error }}
      </div>
      <div v-if="familyStore.loading" class="mb-4">
        {{ t('family.loading') }}
      </div>
      <v-btn color="primary" class="mb-4" @click="openCreateModal">
        {{ t('family.button.create') }}
      </v-btn>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="member in familyStore.familyMembers"
            :key="member.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="mx-auto">
              <v-img src="/avatar-blank.png" height="200px"></v-img>
              <v-card-title class="text-h6">
                {{ member.firstName }} {{ member.lastName }}
              </v-card-title>
              <v-card-text>
                <p>
                  {{ t('family.label.dateOfBirth') }}: {{ member.dateOfBirth }}
                </p>
                <p v-if="member.dateOfDeath">
                  {{ t('family.label.dateOfDeath') }}:
                  <span>{{ member.dateOfDeath }}</span>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <FamilyMemberCreateModal @memberCreated="onMemberCreated" ref="createModal" />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLayout from '@/layouts/AppLayout.vue'
import { useFamilyMembersStore } from '@/stores/familyMemberStore'
import FamilyMemberCreateModal from '@/components/FamilyMemberCreateModal.vue'

const { t } = useI18n()
const familyStore = useFamilyMembersStore()

onMounted(() => {
  familyStore.fetchFamilyMembers()
})

const createModal = ref(null)
const openCreateModal = () => {
  createModal.value.openDialog()
}
const onMemberCreated = () => {
  familyStore.fetchFamilyMembers()
}
</script>

<style scoped>
</style>
