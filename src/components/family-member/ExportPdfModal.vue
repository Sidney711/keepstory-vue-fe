<template>
  <v-dialog data-testid="export-pdf-modal" v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline">{{ t('export_pdf.title') }}</v-card-title>
      <v-card-text>
        <p>{{ t('export_pdf.chooseExport') }}</p>
        <v-radio-group v-model="exportType">
          <v-radio :label="t('export_pdf.radio.family_tree')" value="family_tree" />
          <v-radio :label="t('export_pdf.radio.member')" value="member" />
          <v-radio :label="t('export_pdf.radio.family')" value="family" />
        </v-radio-group>
        <p class="mt-4">{{ t('export_pdf.description') }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="grey" @click="closeDialog">{{ t('general.cancel') }}</v-btn>
        <v-btn color="red" variant="tonal" @click="submitExport" :loading="loading">{{ t('export_pdf.button.export') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import { ExportPdfService } from '@/services/ExportPdfService';
const { t } = useI18n()

const dialog = ref(false);
const exportType = ref<'member' | 'family' | 'family_tree'>('family_tree');
const loading = ref(false);
import { useSnackbar } from '@/composables/useSnackbar'
import { useI18n } from 'vue-i18n'

const { showSnackbar } = useSnackbar()

const props = defineProps<{
  memberId: string;
}>();

function openDialog() {
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
}

async function submitExport() {
  loading.value = true;
  try {
    if (exportType.value === 'member') {
      await ExportPdfService.exportFamilyMember(props.memberId);
    } else if (exportType.value === 'family') {
      await ExportPdfService.exportFamily();
    } else {
      await ExportPdfService.exportFamilyTree(props.memberId);
    }
    showSnackbar(t('export_pdf.alert.success'), 'success');
  } catch (error) {
    showSnackbar(t('export_pdf.alert.error'), 'error');
    console.error('Export selhal:', error);
  } finally {
    loading.value = false;
    closeDialog();
  }
}

defineExpose({
  openDialog,
});
</script>

<style scoped>
.mt-4 {
  margin-top: 16px;
}
</style>
