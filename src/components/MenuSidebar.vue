<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :subtitle="email"
        title="Sandra Adams"
        height="64"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        prepend-icon="mdi-family-tree"
        title="My family"
        value="family"
        @click="$emit('navigate', 'homepage')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="My profile"
        value="profile"
        @click="$emit('navigate', 'profile')"
      ></v-list-item>
    </v-list>

    <v-spacer></v-spacer>

    <v-list>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Logout"
        @click="authorizationStore.logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthorizationStore } from '@/stores/authorizationStore';

const authorizationStore = useAuthorizationStore();

const email = computed(() => authorizationStore.account?.email);
</script>

<style scoped>
</style>
