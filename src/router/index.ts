// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomepageView from '@/views/HomepageView.vue';
import LoginView from '@/views/authorization/LoginView.vue';
import RegistrationView from '@/views/authorization/RegistrationView.vue';
import VerifyAccountView from '@/views/authorization/VerifyAccountView.vue';
import { useAuthorizationStore } from '@/stores/authorizationStore.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomepageView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
    },
    {
      path: '/verify-account',
      name: 'verify-account',
      component: VerifyAccountView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const publicRoutes = ['login', 'registration', 'verify-account'];
  const authorizationStore = useAuthorizationStore();
  const isLoggedIn = await authorizationStore.checkLoggedIn();

  if (!isLoggedIn) {
    if (publicRoutes.includes(to.name as string)) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    if (publicRoutes.includes(to.name as string)) {
      next({ name: 'homepage' });
    } else {
      next();
    }
  }
});

export default router;
