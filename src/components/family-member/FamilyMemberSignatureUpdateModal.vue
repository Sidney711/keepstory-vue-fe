<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">Aktualizace podpisu</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-file-input
            v-model="signature"
            label="Vyberte nový podpis"
            accept="image/*"
            prepend-icon="mdi-pencil"
            outlined
            class="mb-4"
          />
          <div v-if="hasSignature" class="mb-4">
            <v-img :src="signatureImageSrc" height="200px" />
            <v-btn color="error" @click="deleteSignature">Smazat podpis</v-btn>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="submitForm">Uložit</v-btn>
        <v-btn text @click="closeDialog">Zrušit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { defineProps, defineEmits, defineExpose } from 'vue';
import { FamilyMembersService } from '@/services/FamilyMemberService';
import { BACKEND_URL } from '@/env-constants';
import { useConfirm } from '@/composables/useConfirm'
import { useI18n } from 'vue-i18n';

const { showConfirm } = useConfirm()
const { t } = useI18n();

const props = defineProps<{ memberId: string; currentSignatureUrl: string }>();
const emit = defineEmits(['signatureUpdated']);

const dialog = ref(false);
const signature = ref<File | null>(null);

const currentSignature = computed(() => props.currentSignatureUrl);

const signatureImageSrc = computed(() => {
  if (!currentSignature.value) return '';
  return currentSignature.value.startsWith('http')
    ? currentSignature.value
    : BACKEND_URL + currentSignature.value;
});

const hasSignature = computed(() => {
  return currentSignature.value && !currentSignature.value.includes('default-signature.png');
});

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  signature.value = null;
};

async function submitForm() {
  if (!signature.value) return;
  try {
    const formData = new FormData();
    formData.append('data[type]', 'family-members');
    formData.append('data[id]', props.memberId);
    formData.append('data[attributes][signature]', signature.value);
    await FamilyMembersService.updateSignature(props.memberId, formData);
    closeDialog();
    emit('signatureUpdated');
  } catch (error) {
    console.error('Chyba při aktualizaci podpisu:', error);
  }
}

async function deleteSignature() {
  const confirmed = await showConfirm({
    message: 'Opravdu chcete smazat podpis?',
    title: 'Smazání podpisu',
    confirmText: t('general.delete'),
    cancelText: t('general.cancel')
  })

  if (!confirmed) {
    return
  }

  try {
    await FamilyMembersService.deleteSignature(props.memberId);
    closeDialog();
    emit('signatureUpdated');
  } catch (error) {
    console.error('Chyba při mazání podpisu:', error);
  }
}

defineExpose({ openDialog, closeDialog, submitForm });
</script>

<style scoped>
</style>
