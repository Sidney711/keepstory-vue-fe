<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>Nahrát fotky</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="files"
          label="Přetáhněte fotky sem nebo klikněte pro výběr"
          prepend-icon="mdi-upload"
          multiple
          show-size
          truncate-length="15"
          outlined
          dense
          dropzone
          accept="image/*"
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
import { ref, vShow, watch } from 'vue'
import { FamilyMembersService } from '@/services/FamilyMemberService.ts'
import { useSnackbar } from '@/composables/useSnackbar'

const { showSnackbar } = useSnackbar()


interface Props {
  modelValue: boolean;
  memberId: string;
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'files-uploaded'): void;
}>()

const dialog = ref(props.modelValue)
const files = ref<File[]>([])

const close = () => {
  files.value = []
  dialog.value = false
  emit('update:modelValue', false)
}

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal);
});


const uploadFiles = async () => {
  const validFiles = files.value.filter(file => file.type.startsWith('image/'));
  if (validFiles.length !== files.value.length) {
    showSnackbar('Nahrávat můžete pouze obrázky!', 'error');
    return;
  }

  const formData = new FormData();
  validFiles.forEach(file => {
    formData.append('data[attributes][images][]', file);
  });

  try {
    await FamilyMembersService.uploadGalleryImages(props.memberId, formData);
    emit('files-uploaded');
    showSnackbar('Fotky byly úspěšně nahrány.', 'success');
  } catch (error) {
    showSnackbar('Nahrávání fotek selhalo.', 'error');
    console.error(error);
  }
  close();
}

watch(
  () => props.modelValue,
  (val) => {
    dialog.value = val
  }
)
</script>
