<template>
  <v-tabs v-model="currentTab" background-color="grey lighten-4" class="mt-4" grow>
    <v-tab value="info">Základní informace</v-tab>
    <v-tab value="docs">Dokumenty</v-tab>
    <v-tab value="gallery">Galerie</v-tab>
    <v-tab value="stories">Příběhy</v-tab>
  </v-tabs>

  <v-tabs-items v-model="currentTab">
    <v-tab-item value="info">
      <v-card flat v-if="currentTab === 'info'">
        <v-card-text>
          <BasicInfoTab :member="member" />
        </v-card-text>
      </v-card>
    </v-tab-item>

    <v-tab-item value="docs">
      <v-card flat v-if="currentTab === 'docs'">
        <v-card-text>
          <DocsTab />
        </v-card-text>
      </v-card>
    </v-tab-item>

    <v-tab-item value="gallery">
      <v-card flat v-if="currentTab === 'gallery'">
        <v-card-text>
          <GalleryTab />
        </v-card-text>
      </v-card>
    </v-tab-item>

    <v-tab-item value="stories">
      <v-card flat v-if="currentTab === 'stories'">
        <v-card-text>
          <StoriesTab
            :stories="stories"
            :loading="storiesLoading"
            :error="storiesError"
            :formatDate="formatDate"
            @add-story="onAddStory"
            @go-to-story="onGoToStory"
          />
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs-items>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BasicInfoTab from './BasicInfoTab.vue';
import DocsTab from './DocsTab.vue';
import GalleryTab from './GalleryTab.vue';
import StoriesTab from './StoriesTab.vue';
import type { FamilyMember } from '@/interfaces/familyMembers.ts'

const props = defineProps<{
  activeTab: string;
  stories: any[];
  storiesLoading: boolean;
  storiesError: string | null;
  formatDate: (dateStr: string) => string;
  member: FamilyMember;
}>();

const emit = defineEmits<{
  (e: 'update:activeTab', value: string): void;
  (e: 'add-story'): void;
  (e: 'go-to-story', id: string): void;
}>();

const currentTab = computed({
  get: () => props.activeTab,
  set: (val) => emit('update:activeTab', val)
});

const onAddStory = () => {
  emit('add-story');
};

const onGoToStory = (id: string) => {
  emit('go-to-story', id);
};
</script>

<style scoped>
</style>
