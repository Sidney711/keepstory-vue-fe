<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Export PDF</v-card-title>
      <v-card-text>
        <p>Vyberte, co chcete exportovat:</p>
        <v-radio-group v-model="exportType">
          <v-radio label="Exportovat pouze tohoto člena" value="member" />
          <v-radio label="Exportovat celou rodinu" value="family" />
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
const exportType = ref<'member' | 'family'>('member');
const loading = ref(false);

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
    } else {
      await ExportPdfService.exportFamily();
    }
    console.log('Export spuštěn.');
  } catch (error) {
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
