<template>
  <v-card>
    <v-layout>
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

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-folder"
            title="My Files"
            value="myfiles"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Shared with me"
            value="shared"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-star"
            title="Starred"
            value="starred"
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

      <v-main></v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthorizationStore } from '@/stores/authorizationStore';

const authorizationStore = useAuthorizationStore();

const email = computed(() => authorizationStore.account?.email);
</script>

<style scoped>
</style>
