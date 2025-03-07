<template>
  <v-list>
    <v-list-item
      prepend-avatar="/logos/keepstory-icon.png"
      :title="email"
      height="64"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        prepend-icon="mdi-home-heart"
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

    <v-divider></v-divider>

    <v-list class="flex justify-center gap-0.5">
      <span
        @click="changeLanguage('cs')"
        :class="{'font-bold': locale === 'cs'}"
        class="cursor-pointer"
      >
        {{ t('menu.language.cs') }}
      </span>
      <span>/</span>
      <span
        @click="changeLanguage('en')"
        :class="{'font-bold': locale === 'en'}"
        class="cursor-pointer"
      >
        {{ t('menu.language.en') }}
      </span>
    </v-list>
  </v-list>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthorizationStore } from '@/stores/authorizationStore.ts';

const { t, locale } = useI18n();
const authorizationStore = useAuthorizationStore();

const email = computed(() => authorizationStore.account?.email);

onMounted(() => {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale) {
    locale.value = savedLocale;
  } else {
    localStorage.setItem('locale', 'cs');
    locale.value = 'cs';
  }
});

const changeLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('locale', lang);
};
</script>

<style scoped>
</style>
