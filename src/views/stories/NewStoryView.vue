<template>
  <AppLayout>
    <v-container class="py-4 min-h-screen">
      <div class="h-full min-h-screen">
        <QuillEditor theme="snow" toolbar="full" class="h-full min-h-screen" />
      </div>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<style scoped>
</style>
