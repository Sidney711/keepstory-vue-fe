<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        prepend-avatar="/logos/keepstory-icon.png"
        :title="email"
        height="64"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        prepend-icon="mdi-family-tree"
        :title="t('menu.family')"
        value="family"
        @click="$emit('navigate', 'homepage')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        :title="t('menu.profile')"
        value="profile"
        @click="$emit('navigate', 'profile')"
      ></v-list-item>
    </v-list>

    <v-spacer></v-spacer>

    <v-list>
      <v-list-item
        prepend-icon="mdi-logout"
        :title="t('menu.logout')"
        @click="authorizationStore.logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthorizationStore } from '@/stores/authorizationStore';

const { t } = useI18n();
const authorizationStore = useAuthorizationStore();

const email = computed(() => authorizationStore.account?.email);
</script>

<style scoped>
</style>
