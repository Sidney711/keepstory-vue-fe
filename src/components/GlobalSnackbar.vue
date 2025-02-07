<template>
  <v-snackbar
    v-model="snackbarVisible"
    timeout="3000"
    location="top"
    :color="snackbarColor"
    class="ma-4"
  >
    {{ snackbarMessage }}
    <template #actions>
      <v-btn
        color="white"
        variant="text"
        @click="snackbarVisible = false"
      >
        {{ $t('general.close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbar } from '@/composables/useSnackbar'

const { snackbarVisible, snackbarMessage, snackbarColor } = useSnackbar()
</script>
