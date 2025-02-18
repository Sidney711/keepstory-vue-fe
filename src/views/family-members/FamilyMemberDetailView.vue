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
            <FamilyMemberHeader
              :member="member"
              @edit="editMember"
              @delete="deleteMember"
              @export="exportMember"
            />
          </template>
          <template v-else>
            <v-alert type="warning">
              Člen rodiny nebyl nalezen.
            </v-alert>
          </template>
        </v-col>
      </v-row>

      <FamilyMemberTabs
        :activeTab="activeTab"
        @update:activeTab="activeTab = $event"
        :stories="stories"
        :storiesLoading="storiesLoading"
        :storiesError="storiesError"
        :formatDate="formatDate"
        @add-story="addStory"
        @go-to-story="goToStoryDetail"
      />
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import { useFamilyMembersStore } from '@/stores/familyMemberStore';
import { StoriesService } from '@/services/storiesService';
import FamilyMemberHeader from '@/components/family-member/FamilyMemberHeader.vue'
import FamilyMemberTabs from '@/components/family-member-tabs/FamilyMemberTabs.vue'

const route = useRoute();
const router = useRouter();
const familyStore = useFamilyMembersStore();

const memberId = route.params.id as string;
const member = computed(() => familyStore.familyMembers.find(m => m.id === memberId));

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
    stories.value = response.data.data.map((item: any) => {
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
