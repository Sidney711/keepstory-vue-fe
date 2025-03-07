<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Export PDF</v-card-title>
      <v-card-text>
        <p>Vyberte, co chcete exportovat:</p>
        <v-radio-group v-model="exportType">
          <v-radio label="Exportovat rodokmen tohoto člena" value="family_tree" />
          <v-radio label="Exportovat knihu pouze tohoto člena" value="member" />
          <v-radio label="Exportovat knihu celé rodiny" value="family" />
        </v-radio-group>
        <p class="mt-4">
          Výsledný export bude uložen v dokumentech a budete informováni emailem, až bude export hotový.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="grey" @click="closeDialog">Zrušit</v-btn>
        <v-btn color="primary" @click="submitExport" :loading="loading">Exportovat</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import { ExportPdfService } from '@/services/ExportPdfService';

const dialog = ref(false);
const exportType = ref<'member' | 'family' | 'family_tree'>('family_tree');
const loading = ref(false);
import { useSnackbar } from '@/composables/useSnackbar'

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
    showSnackbar('Export byl úspěšně zahájen. Budete informováni emailem, až bude export hotový.', 'success');
  } catch (error) {
    showSnackbar('Export selhal. Zkuste to prosím znovu.', 'error');
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
