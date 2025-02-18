<template>
  <v-card>
    <v-img src="/avatar-blank.png" height="300px" alt="Profilový obrázek" />

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
      {{ member.dateOfBirth }}
      <template v-if="member.dateOfDeath">
        <br />
        {{ member.dateOfDeath }}
      </template>
    </v-card-subtitle>

    <v-card-text>
      <p>Doplňující informace o členu rodiny.</p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface Member {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  dateOfDeath?: string;
}

const props = defineProps<{
  member: Member;
}>();
</script>

<style scoped>
</style>
