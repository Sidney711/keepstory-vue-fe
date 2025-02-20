<template>
  <v-card flat>
    <v-card-title class="flex items-center justify-between">
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium">Galerie</span>
        <v-btn color="primary" @click="addGalleryItem" class="flex items-center">
          <v-icon left>mdi-plus</v-icon>
          Nová fotka
        </v-btn>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class="columns-1 sm:columns-2 lg:columns-3 gap-4">
        <div
          v-for="(item, index) in galleryItems"
          :key="index"
          class="mb-4 break-inside-avoid"
        >
          <v-img :src="item.src" :alt="item.alt" class="rounded-lg relative">
            <v-icon
              class="cursor-pointer hover:opacity-75 absolute top-2 left-2 bg-white rounded-full p-1"
              color="error"
              size="26"
              @click.stop="deleteGalleryItem(index)"
            >
              mdi-delete
            </v-icon>
          </v-img>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface GalleryItem {
  src: string;
  alt: string;
}

const galleryItems = ref<GalleryItem[]>([
  { src: 'https://picsum.photos/300/200?random=1', alt: 'Obrázek 1' },
  { src: 'https://picsum.photos/300/250?random=2', alt: 'Obrázek 2' },
  { src: 'https://picsum.photos/300/300?random=3', alt: 'Obrázek 3' },
  { src: 'https://picsum.photos/300/350?random=4', alt: 'Obrázek 4' },
  { src: 'https://picsum.photos/300/400?random=5', alt: 'Obrázek 5' }
])

const deleteGalleryItem = (index: number) => {
  galleryItems.value.splice(index, 1)
}

const addGalleryItem = () => {
  alert('Přidat novou fotku')
}
</script>
