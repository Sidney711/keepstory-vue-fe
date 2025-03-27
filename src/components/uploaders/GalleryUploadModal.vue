<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>{{ $t('gallery.uploadTitle') }}</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="files"
          :label="$t('gallery.dropzoneLabel')"
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
        <v-btn text @click="close">{{ $t('general.close') }}</v-btn>
        <v-btn color="red" variant="tonal" text @click="uploadFiles">{{ $t('gallery.upload') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { FamilyMembersService } from '@/services/FamilyMemberService.ts'
import { useSnackbar } from '@/composables/useSnackbar'
import { useI18n } from 'vue-i18n'

const { showSnackbar } = useSnackbar()
const { t } = useI18n()

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
  emit('update:modelValue', newVal)
})

const uploadFiles = async () => {
  const validFiles = files.value.filter(file => file.type.startsWith('image/'))
  if (validFiles.length !== files.value.length) {
    showSnackbar(t('gallery.onlyImages'), 'error')
    return
  }

  const formData = new FormData()
  validFiles.forEach(file => {
    formData.append('data[attributes][images][]', file)
  })

  try {
    await FamilyMembersService.uploadGalleryImages(props.memberId, formData)
    emit('files-uploaded')
    showSnackbar(t('gallery.uploadSuccess'), 'success')
  } catch (error) {
    showSnackbar(t('gallery.uploadError'), 'error')
    console.error(error)
  }
  close()
}

watch(
  () => props.modelValue,
  (val) => {
    dialog.value = val
  }
)
</script>
