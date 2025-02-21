<template>
  <v-card flat>
    <v-card-title class="flex items-center justify-between">
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium">Seznam dokumentů</span>
        <v-btn color="primary" @click="openUploadModal" class="flex items-center">
          <v-icon left>mdi-upload</v-icon>
          Nahrát dokumenty
        </v-btn>
      </div>
    </v-card-title>
    <v-divider />
    <v-list>
      <v-list-item
        v-for="(doc, index) in documents"
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
              @click="deleteDocument(doc, index)"
            >
              mdi-delete
            </v-icon>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </v-card>

  <!-- Případně modální okno pro nahrání dokumentů -->
  <DocUploadModal
    v-model="uploadDialog"
    :memberId="memberId"
    @files-uploaded="handleFilesUploaded"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FamilyMembersService } from '@/services/FamilyMemberService.ts';
import { BACKEND_URL } from '@/env-constants';
import DocUploadModal from '@/components/uploaders/DocUploadModal.vue';

interface DocumentItem {
  id: string;
  url: string;
  filename: string;
  created_at: string;
}

const props = defineProps<{
  memberId: string;
}>();

const memberId = props.memberId;
const documents = ref<DocumentItem[]>([]);
const uploadDialog = ref(false);

const fetchDocuments = async () => {
  try {
    const response = await FamilyMembersService.fetchDocuments(memberId);
    const docs: DocumentItem[] = response.data.documents || [];
    documents.value = docs.map(doc => ({
      id: doc.id.toString(),
      url: `${BACKEND_URL}${doc.url}`,
      filename: doc.filename,
      created_at: doc.created_at
    }));
  } catch (error) {
    console.error('Chyba při načítání dokumentů:', error);
  }
};

const deleteDocument = async (doc: DocumentItem, index: number) => {
  try {
    await FamilyMembersService.deleteDocument(memberId, doc.id);
    documents.value.splice(index, 1);
  } catch (error) {
    console.error('Chyba při mazání dokumentu:', error);
    alert('Nepodařilo se smazat dokument.');
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
    a.download = doc.filename; // použijte originální název souboru
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Nepodařilo se stáhnout dokument:', error);
    alert('Nepodařilo se stáhnout dokument.');
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
