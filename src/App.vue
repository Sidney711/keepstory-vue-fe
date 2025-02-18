<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalSnackbar from '@/components/global/GlobalSnackbar.vue'
import GlobalConfirm from '@/components/global/GlobalConfirm.vue'
</script>

<template>
  <RouterView />
  <GlobalSnackbar />
  <GlobalConfirm />
</template>

<style scoped>
</style>
