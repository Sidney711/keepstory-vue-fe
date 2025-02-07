<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AccountService } from '@/services/AccountService.ts';
import { useSnackbar } from '@/composables/useSnackbar';

export default defineComponent({
  name: 'VerifyAccountView',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
    const { showSnackbar } = useSnackbar();

    onMounted(async () => {
      const key = route.query.key;
      if (typeof key === 'string') {
        try {
          await AccountService.verifyAccount({ key });
          showSnackbar(t('verifyAccount.alert.verified'), 'success');
          await router.push({ name: 'homepage' });
        } catch {
          showSnackbar(t('verifyAccount.alert.failed'), 'error');
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
