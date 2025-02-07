<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalSnackbar from '@/components/GlobalSnackbar.vue'
import GlobalConfirm from '@/components/GlobalConfirm.vue'
</script>

<template>
  <RouterView />
  <GlobalSnackbar />
  <GlobalConfirm />
</template>

<style scoped>
</style>
