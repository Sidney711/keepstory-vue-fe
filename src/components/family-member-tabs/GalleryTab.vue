<template>
  <v-card flat>
    <v-card-title class="flex items-center justify-between">
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium">{{ $t('gallery.title') }}</span>
        <v-btn color="red" variant="tonal" @click="openUploadModal">
          <v-icon left>mdi-upload</v-icon>
          {{ $t('gallery.uploadPhotos') }}
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
          <v-img crossorigin="anonymous" :src="item.src" :alt="item.alt" class="rounded-lg relative">
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
import { ref, onMounted } from 'vue';
import GalleryUploadModal from '@/components/uploaders/GalleryUploadModal.vue';
import { FamilyMembersService } from '@/services/FamilyMemberService.ts';
import { useI18n } from 'vue-i18n';
import { useConfirm } from '@/composables/useConfirm.ts';
import { useSnackbar } from '@/composables/useSnackbar';

const { showSnackbar } = useSnackbar();
const { showConfirm } = useConfirm();
const { t } = useI18n();

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

const props = defineProps<{
  memberId: string;
}>();

const currentMemberId = props.memberId;

const galleryItems = ref<GalleryItem[]>([]);
const uppyDialog = ref(false);

const openUploadModal = () => {
  uppyDialog.value = true;
};

const deleteGalleryItem = async (item: GalleryItem) => {
  const confirmed = await showConfirm({
    message: t('gallery.deleteConfirmMessage'),
    title: t('gallery.deleteTitle'),
    confirmText: t('general.delete'),
    cancelText: t('general.cancel')
  });

  if (!confirmed) {
    return;
  }

  try {
    await FamilyMembersService.deleteGalleryImage(currentMemberId, item.id);
    const response = await FamilyMembersService.fetchGalleryImages(currentMemberId);
    const images: { id: string, url: string }[] = response.data.images || [];
    galleryItems.value = images.map((img) => ({
      id: img.id.toString(),
      src: `${img.url}`,
      alt: t('gallery.imageAlt')
    }));
    showSnackbar(t('gallery.photoDeleted'), 'success');
  } catch (error) {
    showSnackbar(t('gallery.photoDeleteError'), 'error');
    console.error(error);
  }
};

const downloadGalleryItem = async (item: GalleryItem) => {
  try {
    const response = await fetch(item.src);
    if (!response.ok) {
      throw new Error(t('gallery.photoDownloadError'));
    }
    const blob = await response.blob();

    const mime = response.headers.get('Content-Type') || blob.type;
    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png':  'png',
      'image/webp': 'webp',
      'image/gif':  'gif',
      'image/avif': 'avif'
    };
    let ext = mimeToExt[mime];

    if (!ext) {
      const match = item.src.split('?')[0].match(/\.([a-z0-9]+)$/i);
      ext = match ? match[1] : 'bin';
    }

    const baseName = (item.alt || 'download').replace(/\.[a-z0-9]+$/i, '');
    const fileName = `${baseName}.${ext}`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    showSnackbar(t('gallery.photoDownloading'), 'success');
  } catch (error) {
    showSnackbar(t('gallery.photoDownloadError'), 'error');
    console.error(error);
  }
};

const handleFilesUploaded = async () => {
  try {
    const response = await FamilyMembersService.fetchGalleryImages(currentMemberId);
    const images: { id: string, url: string }[] = response.data.images || [];
    galleryItems.value = images.map((img) => ({
      id: img.id.toString(),
      src: `${img.url}`,
      alt: t('gallery.imageAlt')
    }));
  } catch (error) {
    console.error('Chyba při načítání galerie:', error);
  }
};

onMounted(async () => {
  try {
    const response = await FamilyMembersService.fetchGalleryImages(currentMemberId);
    const images: { id: string, url: string }[] = response.data.images || [];
    galleryItems.value = images.map((img) => ({
      id: img.id.toString(),
      src: `${img.url}`,
      alt: t('gallery.imageAlt')
    }));
  } catch (error) {
    console.error('Chyba při načítání galerie:', error);
  }
});
</script>
