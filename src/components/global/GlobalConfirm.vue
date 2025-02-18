<template>
  <v-dialog v-model="confirmVisible" max-width="400" persistent>
    <v-card>
      <v-card-title class="headline">{{ confirmTitle }}</v-card-title>
      <v-card-text>{{ confirmMessage }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn data-testid="global-confirm-cancel-button" text color="primary" @click="onCancel">{{ confirmCancelText }}</v-btn>
        <v-btn data-testid="global-confirm-confirm-button" text color="primary" @click="onConfirm">{{ confirmConfirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useConfirm } from '@/composables/useConfirm.ts'

const {
  confirmVisible,
  confirmTitle,
  confirmMessage,
  confirmConfirmText,
  confirmCancelText,
  onConfirm,
  onCancel,
} = useConfirm()
</script>

<style scoped>
</style>
