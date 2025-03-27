<template>
  <v-card flat>
    <v-card-title class="flex items-center justify-between">
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium">{{ $t('documents.uploaded') }}</span>
        <v-btn color="red" variant="tonal" @click="openUploadModal" class="flex items-center">
          <v-icon left>mdi-upload</v-icon>
          {{ $t('documents.uploadButton') }}
        </v-btn>
      </div>
    </v-card-title>
    <v-divider />
    <v-list>
      <v-list-item
        v-for="doc in originalDocuments"
        :key="doc.id"
        class="border-b border-gray-300"
      >
        <div class="flex items-center gap-4 py-2 w-full justify-between">
          <div class="flex flex-col">
            <span class="font-medium">{{ doc.filename }}</span>
            <span class="text-sm text-gray-500">{{ formatDate(doc.created_at) }}</span>
          </div>
          <div class="flex gap-2 items-center">
            <v-icon
              class="cursor-pointer hover:opacity-75"
              size="26"
              @click="downloadDocument(doc)"
            >
              mdi-download
            </v-icon>
            <v-icon
              class="cursor-pointer hover:opacity-75 text-red-500"
              size="26"
              @click="deleteDocument(doc)"
            >
              mdi-delete
            </v-icon>
          </div>
        </div>
      </v-list-item>
    </v-list>

    <v-card-title class="mt-4">
      <span class="text-lg font-medium">{{ $t('documents.exportedPDF') }}</span>
    </v-card-title>
    <v-divider />
    <v-list>
      <v-list-item
        v-for="doc in exportedPdfs"
        :key="doc.id"
        class="border-b border-gray-300"
      >
        <div class="flex items-center gap-4 py-2 w-full justify-between">
          <div class="flex flex-col">
            <span class="font-medium">{{ doc.filename }}</span>
            <span class="text-sm text-gray-500">{{ formatDate(doc.created_at) }}</span>
          </div>
          <div class="flex gap-2 items-center">
            <v-icon
              class="cursor-pointer hover:opacity-75"
              size="26"
              @click="downloadDocument(doc)"
            >
              mdi-download
            </v-icon>
            <v-icon
              class="cursor-pointer hover:opacity-75 text-red-500"
              size="26"
              @click="deleteDocument(doc)"
            >
              mdi-delete
            </v-icon>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </v-card>

  <DocUploadModal
    v-model="uploadDialog"
    :memberId="memberId"
    @files-uploaded="handleFilesUploaded"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { FamilyMembersService } from '@/services/FamilyMemberService.ts';
import DocUploadModal from '@/components/uploaders/DocUploadModal.vue';
import { useConfirm } from '@/composables/useConfirm';
import { useI18n } from 'vue-i18n';
import { useSnackbar } from '@/composables/useSnackbar';

const { showSnackbar } = useSnackbar();
const { showConfirm } = useConfirm();
const { t } = useI18n();

interface DocumentItem {
  id: string;
  url: string;
  filename: string;
  created_at: string;
  type: 'export' | 'uploaded';
}

const props = defineProps<{ memberId: string }>();
const memberId = props.memberId;
const documents = ref<DocumentItem[]>([]);
const uploadDialog = ref(false);

const fetchDocuments = async () => {
  try {
    const response = await FamilyMembersService.fetchDocuments(memberId);
    const docs: DocumentItem[] = response.data.documents || [];
    documents.value = docs.map(doc => ({
      id: doc.id.toString(),
      url: `${doc.url}`,
      filename: doc.filename,
      created_at: doc.created_at,
      type: doc.type
    }));
  } catch (error) {
    console.error('Chyba při načítání dokumentů:', error);
  }
};

const originalDocuments = computed(() => {
  return documents.value.filter(doc => doc.type === 'uploaded');
});

const exportedPdfs = computed(() => {
  return documents.value.filter(doc => doc.type === 'export');
});

const deleteDocument = async (doc: DocumentItem) => {
  const confirmed = await showConfirm({
    message: t('documents.deleteConfirmMessage'),
    title: t('documents.deleteTitle'),
    confirmText: t('general.delete'),
    cancelText: t('general.cancel')
  });

  if (!confirmed) {
    return;
  }

  try {
    await FamilyMembersService.deleteDocument(memberId, doc.id);
    const index = documents.value.findIndex(d => d.id === doc.id);
    if (index !== -1) {
      documents.value.splice(index, 1);
    }
    showSnackbar(t('documents.documentDeleted'), 'success');
  } catch (error) {
    console.error('Chyba při mazání dokumentu:', error);
    showSnackbar(t('documents.documentDeleteError'), 'error');
  }
};

const downloadDocument = async (doc: DocumentItem) => {
  try {
    const response = await fetch(doc.url);
    if (!response.ok) {
      throw new Error('Chyba při načítání souboru.');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    showSnackbar(t('documents.documentDownloading'), 'success');
  } catch (error) {
    console.error('Nepodařilo se stáhnout dokument:', error);
    showSnackbar(t('documents.documentDownloadError'), 'error');
  }
};

const openUploadModal = () => {
  uploadDialog.value = true;
};

const handleFilesUploaded = async () => {
  await fetchDocuments();
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString();
};

onMounted(fetchDocuments);
</script>
