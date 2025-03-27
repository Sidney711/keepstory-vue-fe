<template>
  <AppLayout>
    <v-container class="py-4" fluid>
      <v-btn color="red" variant="tonal" class="mb-4" @click="goBack">
        {{ t('family.backToMember') }}
      </v-btn>

      <v-row justify="center">
        <v-col cols="12" sm="10" md="8">
          <template v-if="loading">
            <v-progress-circular indeterminate color="primary" class="mx-auto" />
          </template>
          <template v-else-if="error">
            <v-alert type="error" dismissible>
              {{ error }}
            </v-alert>
          </template>
          <template v-else-if="story">
            <v-card>
              <v-card-title class="flex justify-between items-center">
                <div class="text-h4">{{ story.title }}</div>
                <div class="flex gap-2">
                  <v-btn icon @click="editStory">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteStory">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-card-subtitle class="text-body-2 text-gray-600">
                <span>{{ t('story.created') }} {{ formatDate(story.createdAt) }}</span>
                <span v-if="story.date"> | {{ t('story.date') }}: {{ story.date }}</span>
              </v-card-subtitle>
              <v-card-text>
                <div v-html="story.content" class="prose max-w-none story-content"></div>
              </v-card-text>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import { StoriesService } from '@/services/storiesService';
import { useConfirm } from '@/composables/useConfirm'
import { useI18n } from 'vue-i18n';
import { useSnackbar } from '@/composables/useSnackbar'

const { showSnackbar } = useSnackbar()
const { showConfirm } = useConfirm()
const { t } = useI18n();

interface StoryDetail {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: string;
}

const route = useRoute();
const router = useRouter();

const storyId = route.params.id as string;
const familyMemberId = (route.query.person as string) || '';

const story = ref<StoryDetail | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const fetchStoryDetail = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await StoriesService.fetchStory(storyId);
    const attrs = response.data.data.attributes;
    let dateStr = attrs["date-type"] === 'exact' ? attrs["story-date"] : attrs["story-year"];
    if (attrs["is-date-approx"]) {
      dateStr = dateStr ? `${dateStr} (${t('story.approximate')})` : t('story.approximate');
    }
    story.value = {
      id: response.data.data.id,
      title: attrs.title,
      content: attrs.content,
      date: dateStr || '',
      createdAt: attrs["created-at"],
    };
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchStoryDetail();
});

const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString();
};

const goBack = () => {
  if (familyMemberId) {
    router.push({ name: 'family-member-detail', params: { id: familyMemberId } });
  } else {
    router.push('/');
  }
};

const editStory = () => {
  router.push({ name: 'edit-story', params: { id: story.value?.id }, query: { person: familyMemberId } });
};

const deleteStory = async () => {
  const confirmed = await showConfirm({
    message: t('story.deleteConfirmMessage'),
    title: t('story.deleteTitle'),
    confirmText: t('general.delete'),
    cancelText: t('general.cancel')
  })

  if (!confirmed) {
    return
  }

  const response = await StoriesService.deleteStory(storyId);

  if (response.status === 204) {
    showSnackbar(t('story.deleteSuccess'), 'success');
    goBack();
  } else {
    showSnackbar(t('story.deleteError'), 'error');
  }
};
</script>

<style scoped>
:deep(.story-content h1) {
  font-size: 32px !important;
  font-weight: bold !important;
  margin: 20px 0 10px !important;
}

:deep(.story-content h2) {
  font-size: 28px !important;
  font-weight: bold !important;
  margin: 18px 0 9px !important;
}

:deep(.story-content h3) {
  font-size: 24px !important;
  font-weight: bold !important;
  margin: 16px 0 8px !important;
}

:deep(.story-content h4) {
  font-size: 20px !important;
  font-weight: bold !important;
  margin: 14px 0 7px !important;
}

:deep(.story-content h5) {
  font-size: 18px !important;
  font-weight: bold !important;
  margin: 12px 0 6px !important;
}

:deep(.story-content h6) {
  font-size: 16px !important;
  font-weight: bold !important;
  margin: 10px 0 5px !important;
}

:deep(.story-content p) {
  font-size: 1rem !important;
  margin-bottom: 1rem !important;
}
</style>
