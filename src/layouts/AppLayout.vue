<template>
  <v-card>
    <v-layout>
      <MenuSidebar @navigate="navigateTo" />

      <v-main>
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import MenuSidebar from '@/components/MenuSidebar.vue'

const router = useRouter();

const navigateTo = (routeName: string) => {
  router.push({ name: routeName });
};
</script>

<style scoped>
</style>
