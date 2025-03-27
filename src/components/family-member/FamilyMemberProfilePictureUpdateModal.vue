<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">{{ $t('profile.updateProfilePictureTitle') }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-file-input
            v-model="profilePhoto"
            :label="$t('profile.chooseNewPhoto')"
            accept="image/*"
            prepend-icon="mdi-image"
            outlined
            class="mb-4"
          />
          <div v-if="hasProfilePicture" class="mb-4">
            <v-img :src="profileImageSrc" height="200px" />
            <v-btn color="error" @click="deleteProfilePicture">{{ $t('profile.deletePhoto') }}</v-btn>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red" variant="tonal" @click="submitForm">{{ $t('general.save') }}</v-btn>
        <v-btn text @click="closeDialog">{{ $t('general.cancel') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { defineProps, defineEmits, defineExpose } from 'vue';
import { FamilyMembersService } from '@/services/FamilyMemberService.ts';
import { BACKEND_URL } from '@/env-constants.ts';
import { useConfirm } from '@/composables/useConfirm'
import { useI18n } from 'vue-i18n';
import { useSnackbar } from '@/composables/useSnackbar'

const { showSnackbar } = useSnackbar()

const { showConfirm } = useConfirm()
const { t } = useI18n();

const props = defineProps<{
  memberId: string,
  currentProfilePictureUrl: string
}>();
const emit = defineEmits(['profilePictureUpdated']);

const dialog = ref(false);
const profilePhoto = ref<File | null>(null);

const currentProfilePicture = computed(() => props.currentProfilePictureUrl);

const profileImageSrc = computed(() => {
  if (!currentProfilePicture.value) return '';
  return currentProfilePicture.value.startsWith('http')
    ? currentProfilePicture.value
    : BACKEND_URL + currentProfilePicture.value;
});

const hasProfilePicture = computed(() => {
  return currentProfilePicture.value && !currentProfilePicture.value.includes('avatar-blank.png');
});

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  profilePhoto.value = null;
};

async function submitForm() {
  if (!profilePhoto.value) return;
  try {
    const formData = new FormData();
    formData.append('data[type]', 'family-members');
    formData.append('data[id]', props.memberId);
    formData.append('data[attributes][profile_picture]', profilePhoto.value);
    await FamilyMembersService.updateProfilePicture(props.memberId, formData);
    closeDialog();
    showSnackbar(t('profile.photoAdded'), 'success');
    emit('profilePictureUpdated');
  } catch (error) {
    showSnackbar(t('profile.photoUploadError'), 'error');
    console.error('Chyba při aktualizaci profilové fotky:', error);
  }
}

async function deleteProfilePicture() {
  const confirmed = await showConfirm({
    message: t('profile.confirmDeletePhotoMessage'),
    title: t('profile.deletePhotoTitle'),
    confirmText: t('general.delete'),
    cancelText: t('general.cancel')
  });

  if (!confirmed) {
    return;
  }

  try {
    await FamilyMembersService.deleteProfilePicture(props.memberId);
    closeDialog();
    showSnackbar(t('profile.photoDeleted'), 'success');
    emit('profilePictureUpdated');
  } catch (error) {
    showSnackbar(t('profile.photoDeleteError'), 'error');
    console.error('Chyba při mazání profilové fotky:', error);
  }
}

defineExpose({ openDialog, closeDialog, submitForm });
</script>

<style scoped>
</style>
