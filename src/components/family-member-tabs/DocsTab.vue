<template>
  <v-card flat>
    <v-card-title class="flex items-center justify-between">
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium">Seznam souborů</span>
        <v-btn color="primary" @click="addFile" class="flex items-center">
          <v-icon left>mdi-plus</v-icon>
          Nový soubor
        </v-btn>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="(file, index) in files"
        :key="index"
        class="border-b border-gray-300"
      >
        <div class="flex items-center gap-4 py-2 w-full justify-between">
          <div class="flex flex-col">
            <span class="font-medium">{{ file.name }}</span>
            <span class="text-sm text-gray-500">{{ file.date }}</span>
          </div>
          <div class="flex gap-2 items-center">
            <v-icon
              class="cursor-pointer hover:opacity-75"
              size="26"
              @click="downloadFile(file)"
            >
              mdi-download
            </v-icon>
            <v-icon
              class="cursor-pointer hover:opacity-75 text-red-500"
              size="26"
              @click="deleteFile(index)"
            >
              mdi-delete
            </v-icon>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FileItem {
  name: string;
  date: string;
  url: string;
}

const files = ref<FileItem[]>([
  { name: 'dokument1.pdf', date: '2025-02-20', url: '/downloads/dokument1.pdf' },
  { name: 'dokument2.docx', date: '2025-02-19', url: '/downloads/dokument2.docx' },
])

const downloadFile = (file: FileItem) => {
  window.open(file.url, '_blank')
}

const deleteFile = (index: number) => {
  files.value.splice(index, 1)
}

const addFile = () => {
  alert('Přidat nový soubor')
}
</script>
