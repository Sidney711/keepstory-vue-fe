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
import { ref, watch } from 'vue'

interface Props {
  modelValue: boolean;
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'files-uploaded', files: File[]): void;
}>()

const dialog = ref(props.modelValue)
const files = ref<File[]>([])

const close = () => {
  dialog.value = false
  emit('update:modelValue', false)
}

const uploadFiles = () => {
  const validFiles = files.value.filter(file => file.type.startsWith('image/'));
  if (validFiles.length !== files.value.length) {
    alert('Nahrávat můžete pouze obrázky!');
    return;
  }
  console.log('Uploading files:', validFiles);
  emit('files-uploaded', validFiles);
  close();
}

watch(
  () => props.modelValue,
  (val) => {
    dialog.value = val
  }
)
</script>
