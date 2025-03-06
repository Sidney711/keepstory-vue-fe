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
              @editProfilePicture="openProfilePictureModal"
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
        :member="member"
        v-if="member"
      />

      <FamilyMemberGeneralUpdateModal
        :memberId="member ? member.id : ''"
        ref="updateModal"
        @memberUpdated="onMemberUpdated"
      />
      <FamilyMemberProfilePictureUpdateModal
        v-if="member"
        :memberId="member.id"
        :currentProfilePictureUrl="member.profilePictureUrl ? BACKEND_URL + member.profilePictureUrl : '/avatar-blank.png'"
        ref="profilePictureModal"
        @profilePictureUpdated="onMemberUpdated"
      />

      <ExportPdfModal v-if="member" :memberId="member.id" ref="exportModal" />

    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import { useFamilyMembersStore } from '@/stores/familyMemberStore';
import { StoriesService } from '@/services/storiesService';
import FamilyMemberHeader from '@/components/family-member/FamilyMemberHeader.vue';
import FamilyMemberTabs from '@/components/family-member-tabs/FamilyMemberTabs.vue';
import FamilyMemberProfilePictureUpdateModal from '@/components/family-member/FamilyMemberProfilePictureUpdateModal.vue';
import ExportPdfModal from '@/components/family-member/ExportPdfModal.vue';
import { BACKEND_URL } from '@/env-constants.ts';
import FamilyMemberGeneralUpdateModal
  from '@/components/family-member/FamilyMemberGeneralUpdateModal.vue'
import { FamilyMembersService } from '@/services/FamilyMemberService.ts'

const route = useRoute();
const router = useRouter();
const familyStore = useFamilyMembersStore();

const memberId = computed(() => route.params.id as string);
const member = computed(() => {
  if (familyStore.familyMemberDetail && familyStore.familyMemberDetail.id === memberId.value) {
    return familyStore.familyMemberDetail
  }
})

const onMemberUpdated = async () => {
  await familyStore.fetchFamilyMember(memberId.value);
};

watch(
  () => memberId.value,
  (newId) => {
    if (!member.value) {
      familyStore.fetchFamilyMember(memberId.value);
    }
    fetchStories(newId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
);

onMounted(() => {
  if (!member.value) {
    familyStore.fetchFamilyMember(memberId.value);
  }
  fetchStories(memberId.value);
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

const updateModal = ref(null);
const exportModal = ref(null);
const profilePictureModal = ref(null);

const editMember = () => {
  updateModal.value.openDialog();
};

const deleteMember = async () => {
  const response = await FamilyMembersService.deleteFamilyMember(memberId.value);

  if (response.status === 204) {
    alert('Člen rodiny byl úspěšně smazán.');
    await router.push({ name: 'homepage' });
  }
};

const exportMember = () => {
  exportModal.value.openDialog();
};

const openProfilePictureModal = () => {
  profilePictureModal.value.openDialog();
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
