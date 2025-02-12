// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/authorization/LoginView.vue';
import RegistrationView from '@/views/authorization/RegistrationView.vue';
import VerifyAccountView from '@/views/authorization/VerifyAccountView.vue';
import { useAuthorizationStore } from '@/stores/authorizationStore.ts'
import VerifyAccountResendView from '@/views/authorization/VerifyAccountResendView.vue'
import ResetPasswordRequestView from '@/views/authorization/ResetPasswordRequestView.vue'
import ResetPasswordView from '@/views/authorization/ResetPasswordView.vue'
import ProfileView from '@/views/settings/ProfileView.vue'
import VerifyEmailChangeView from '@/views/authorization/VerifyEmailChangeView.vue'
import FamilyMembersView from '@/views/family-members/FamilyMembersView.vue'
import FamilyMemberDetailView from '@/views/family-members/FamilyMemberDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: FamilyMembersView,
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
    {
      path: '/verify-account-resend',
      name: 'verify-account-resend',
      component: VerifyAccountResendView,
    },
    {
      path: '/reset-password-request',
      name: 'reset-password-request',
      component: ResetPasswordRequestView,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/verify-email-change',
      name: 'verify-email-change',
      component: VerifyEmailChangeView,
    },
    {
      path: '/family-member-detail/:id',
      name: 'family-member-detail',
      component: FamilyMemberDetailView
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  const publicRoutes = ['login', 'registration', 'verify-account', 'verify-account-resend', 'reset-password-request', 'reset-password'];
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
