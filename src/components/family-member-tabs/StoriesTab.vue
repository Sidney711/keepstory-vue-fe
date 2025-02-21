<template>
  <v-card flat>
    <v-card-text>
      <div class="flex justify-end mb-4">
        <v-btn color="primary" @click="$emit('add-story')">
          <v-icon left>mdi-plus</v-icon>
          Nový příběh
        </v-btn>
      </div>

      <template v-if="loading">
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </template>
      <template v-else-if="error">
        <v-alert type="error">
          {{ error }}
        </v-alert>
      </template>
      <div v-else>
        <v-card
          v-for="story in stories"
          :key="story.id"
          outlined
          class="mb-3 rounded-lg hover:shadow-lg cursor-pointer"
          @click="$emit('go-to-story', story.id)"
        >
          <v-card-text class="flex items-center justify-between">
            <div>
              <div class="text-h6 font-medium">{{ story.title }}</div>
              <div class="text-body-2 text-gray-600">
                <span>Vytvořeno: {{ formatDate(story.createdAt) }}</span>
                <span v-if="story.date"> | Datum: {{ story.date }}</span>
              </div>
            </div>
            <v-icon>mdi-chevron-right</v-icon>
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  stories: any[];
  loading: boolean;
  error: string | null;
  formatDate: (dateStr: string) => string;
}>();
</script>

<style scoped>
</style>
