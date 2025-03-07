<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>Nahrát dokumenty</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="files"
          label="Přetáhněte dokumenty sem nebo klikněte pro výběr"
          prepend-icon="mdi-upload"
          multiple
          show-size
          outlined
          dense
          dropzone
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Zavřít</v-btn>
        <v-btn color="primary" text @click="uploadFiles">Nahrát</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { FamilyMembersService } from '@/services/FamilyMemberService.ts';
import { useSnackbar } from '@/composables/useSnackbar'

const { showSnackbar } = useSnackbar()


interface Props {
  modelValue: boolean;
  memberId: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'files-uploaded'): void;
}>();

const dialog = ref(props.modelValue);
const files = ref<File[]>([]);

const close = () => {
  files.value = [];
  dialog.value = false;
  emit('update:modelValue', false);
};

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal);
});

const uploadFiles = async () => {
  const formData = new FormData();
  files.value.forEach(file => {
    formData.append('data[attributes][documents][]', file);
  });

  try {
    await FamilyMembersService.uploadDocuments(props.memberId, formData);
    showSnackbar('Dokumenty byly nahrány.', 'success')
    emit('files-uploaded');
  } catch (error) {
    console.error('Chyba při nahrávání dokumentů:', error);
    showSnackbar('Nepodařilo se nahrát dokumenty.', 'error')
  }
  close();
};

watch(
  () => props.modelValue,
  (val) => {
    dialog.value = val;
  }
);
</script>
