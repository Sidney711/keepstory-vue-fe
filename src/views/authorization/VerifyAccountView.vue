<template>
  <div>
    Ověřuji účet, prosím čekejte...
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { AccountService } from '@/services/accountService.ts'

export default defineComponent({
  name: 'VerifyAccountView',
  setup() {
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      const key = route.query.key;
      if (typeof key === 'string') {
        try {
          await AccountService.verifyAccount({ key });
          alert('Účet byl úspěšně ověřen!');
          await router.push({ name: 'homepage' });
        } catch {
          alert('Něco se pokazilo při ověřování účtu!');
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
