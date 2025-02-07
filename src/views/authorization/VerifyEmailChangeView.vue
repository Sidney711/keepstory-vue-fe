<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AccountService } from '@/services/AccountService.ts';
import { useAuthorizationStore } from '@/stores/authorizationStore.ts';

export default defineComponent({
  name: 'VerifyAccountView',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();

    onMounted(async () => {
      const key = route.query.key;
      if (typeof key === 'string') {
        try {
          await AccountService.verifyLoginChange({ key });
          alert(t('verifyEmailChange.alert.success'));
          const authorizationStore = useAuthorizationStore();
          await authorizationStore.logout();
        } catch {
          alert(t('verifyEmailChange.alert.failed'));
          await router.push({ name: 'homepage' });
        }
      } else {
        await router.push({ name: 'homepage' });
      }
    });

    return {};
  },
});
</script>

<style scoped>
</style>
