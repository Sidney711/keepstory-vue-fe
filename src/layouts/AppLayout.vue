<template>
  <v-app>
    <v-navigation-drawer
      app
      expand-on-hover
      rail
      :mobile-breakpoint="0"
    >
      <MenuSidebar @navigate="navigateTo" />
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import MenuSidebar from '@/components/global/MenuSidebar.vue';

const router = useRouter();

const navigateTo = (routeName: string) => {
  router.push({ name: routeName });
};
</script>

<style scoped>
</style>
