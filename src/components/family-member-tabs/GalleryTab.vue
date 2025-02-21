<template>
  <v-card flat>
    <v-card-title class="flex items-center justify-between">
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium">Galerie</span>
        <v-btn color="secondary" @click="openUploadModal">
          <v-icon left>mdi-upload</v-icon>
          Nahrát fotky
        </v-btn>
      </div>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <div class="columns-1 sm:columns-2 lg:columns-3 gap-4">
        <div
          v-for="(item, index) in galleryItems"
          :key="item.id"
          class="mb-4 break-inside-avoid"
        >
          <v-img :src="item.src" :alt="item.alt" class="rounded-lg relative">
            <v-icon
              class="cursor-pointer hover:opacity-75 absolute top-2 left-2 bg-white rounded-full p-1"
              color="error"
              size="26"
              @click.stop="deleteGalleryItem(item)"
            >
              mdi-delete
            </v-icon>
            <v-icon
              class="cursor-pointer hover:opacity-75 absolute top-2 left-4 bg-white rounded-full p-1"
              color="black"
              size="26"
              @click.stop="downloadGalleryItem(item)"
            >
              mdi-download
            </v-icon>
          </v-img>
        </div>
      </div>
    </v-card-text>
  </v-card>

  <GalleryUploadModal
    v-model="uppyDialog"
    :memberId="currentMemberId"
    @files-uploaded="handleFilesUploaded"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GalleryUploadModal from '@/components/uploaders/GalleryUploadModal.vue'
import { FamilyMembersService } from '@/services/FamilyMemberService.ts'
import { BACKEND_URL } from '@/env-constants'

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

const props = defineProps<{
  memberId: string;
}>()

const currentMemberId = props.memberId

const galleryItems = ref<GalleryItem[]>([])

const uppyDialog = ref(false)

const openUploadModal = () => {
  uppyDialog.value = true
}

const deleteGalleryItem = async (item: GalleryItem) => {
  try {
    console.log('Mazání obrázku:', item);
    await FamilyMembersService.deleteGalleryImage(currentMemberId, item.id);
    const response = await FamilyMembersService.fetchGalleryImages(currentMemberId);
    const images: { id: string, url: string }[] = response.data.images || [];
    galleryItems.value = images.map((img) => ({
      id: img.id.toString(),
      src: `${BACKEND_URL}${img.url}`,
      alt: 'Obrázek'
    }));
  } catch (error) {
    console.error(error);
    alert('Nepodařilo se smazat obrázek.');
  }
}

const downloadGalleryItem = async (item: GalleryItem) => {
  try {
    const response = await fetch(item.src);
    if (!response.ok) {
      throw new Error('Chyba při načítání obrázku.');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (item.alt ? item.alt : 'download') + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert('Nepodařilo se stáhnout obrázek.');
  }
}

const handleFilesUploaded = async () => {
  try {
    const response = await FamilyMembersService.fetchGalleryImages(currentMemberId);
    const images: { id: string, url: string }[] = response.data.images || [];
    galleryItems.value = images.map((img) => ({
      id: img.id.toString(),
      src: `${BACKEND_URL}${img.url}`,
      alt: 'Obrázek'
    }));
  } catch (error) {
    console.error('Chyba při načítání galerie:', error);
  }
}


onMounted(async () => {
  try {
    const response = await FamilyMembersService.fetchGalleryImages(currentMemberId);
    const images: { id: string, url: string }[] = response.data.images || [];
    galleryItems.value = images.map((img) => ({
      id: img.id.toString(),
      src: `${BACKEND_URL}${img.url}`,
      alt: 'Obrázek'
    }));
  } catch (error) {
    console.error('Chyba při načítání galerie:', error);
  }
});

</script>
