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

              <!-- Zobrazení načtených příběhů -->
              <template v-if="storiesLoading">
                <v-progress-circular indeterminate color="primary" class="mx-auto" />
              </template>
              <template v-else-if="storiesError">
                <v-alert type="error">
                  {{ storiesError }}
                </v-alert>
              </template>
              <div v-else>
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
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AppLayout from '@/layouts/AppLayout.vue';
import { useFamilyMembersStore } from '@/stores/familyMemberStore';
import { StoriesService } from '@/services/storiesService';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const familyStore = useFamilyMembersStore();

const memberId = route.params.id as string;

const member = computed(() => {
  return familyStore.familyMembers.find((m) => m.id === memberId);
});

onMounted(() => {
  if (!member.value) {
    familyStore.fetchFamilyMembers();
  }
  fetchStories(memberId);
});

interface Story {
  id: string;
  title: string;
  date: string;
  createdAt: string;
}

const stories = ref<Story[]>([]);
const storiesLoading = ref(false);
const storiesError = ref<string | null>(null);

const fetchStories = async (familyMemberId: string) => {
  storiesLoading.value = true;
  storiesError.value = null;
  try {
    const response = await StoriesService.fetchStoriesForFamilyMember(familyMemberId);
    stories.value = response.data.data.map((item) => {
      const attrs = item.attributes;
      let dateStr = attrs["date-type"] === 'exact' ? attrs["story-date"] : attrs["story-year"];
      if (attrs["is-date-approx"]) {
        dateStr = dateStr ? `${dateStr} (odhad)` : 'odhad';
      }
      return {
        id: item.id,
        title: attrs.title,
        date: dateStr || '',
        createdAt: attrs["created-at"],
      };
    });
  } catch (error: any) {
    storiesError.value = error.message;
  } finally {
    storiesLoading.value = false;
  }
};


const activeTab = ref('info');

const editMember = () => {
  console.log("Edit member:", member.value);
};

const deleteMember = () => {
  console.log("Delete member:", member.value);
};

const exportMember = () => {
  console.log("Export member:", member.value);
};

const addStory = () => {
  if (member.value) {
    router.push({ name: 'new-story', query: { person: member.value.id } });
  } else {
    router.push({ name: 'new-story' });
  }
};

const goToStoryDetail = (id: string) => {
  if (member.value) {
    router.push({ name: 'story-detail', params: { id }, query: { person: member.value.id } });
  } else {
    router.push({ name: 'story-detail', params: { id } });
  }
};


const formatDate = (dateStr: string): string => {
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return dateStr;
  return dateObj.toLocaleDateString();
};
</script>

<style scoped>
</style>
