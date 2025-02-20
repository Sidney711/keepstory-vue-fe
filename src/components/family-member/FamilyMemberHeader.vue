<template>
  <v-card>
    <v-img v-if="member.profilePictureUrl" :src="BACKEND_URL + member.profilePictureUrl" height="300px" alt="Profilový obrázek" />
    <v-img v-else src="/avatar-blank.png" height="300px" alt="Profilový obrázek" />

    <v-card-title>
      <div class="flex gap-2 pb-2">
        <v-btn icon @click="$emit('edit')">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="$emit('delete')">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="$emit('export')">
          <v-icon>mdi-file-pdf-box</v-icon>
        </v-btn>
      </div>
      <div class="text-h4">{{ member.firstName }} {{ member.lastName }}</div>
    </v-card-title>

    <v-card-subtitle>
      Datum narození: {{ formatDate(member.dateOfBirth) }}
      <template v-if="member.dateOfDeath">
        <br />
        Datum úmrtí: {{ formatDate(member.dateOfDeath) }}
      </template>
    </v-card-subtitle>

    <v-card-text>
      <p>{{member.shortDescription}}</p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { FamilyMember } from '@/interfaces/familyMembers.ts'
import { BACKEND_URL } from '@/env-constants.ts'

const props = defineProps<{
  member: FamilyMember;
}>();

const { locale } = useI18n();

function formatDate(date: string): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(locale.value);
}
</script>

<style scoped>
</style>
