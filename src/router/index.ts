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
import NewStoryView from '@/views/stories/NewStoryView.vue'
import StoryDetailView from '@/views/stories/StoryDetailView.vue'
import EditStoryView from '@/views/stories/EditStoryView.vue'
import { i18n } from '@/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: FamilyMembersView,
      meta: { title: 'titles.familyMembers' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'titles.login' }
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
      meta: { title: 'titles.registration' }
    },
    {
      path: '/verify-account',
      name: 'verify-account',
      component: VerifyAccountView,
      meta: { title: 'titles.verifyAccount' }
    },
    {
      path: '/verify-account-resend',
      name: 'verify-account-resend',
      component: VerifyAccountResendView,
      meta: { title: 'titles.verifyAccountResend' }
    },
    {
      path: '/reset-password-request',
      name: 'reset-password-request',
      component: ResetPasswordRequestView,
      meta: { title: 'titles.resetPasswordRequest' }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: { title: 'titles.resetPassword' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { title: 'titles.profile' }
    },
    {
      path: '/verify-email-change',
      name: 'verify-email-change',
      component: VerifyEmailChangeView,
      meta: { title: 'titles.verifyEmailChange' }
    },
    {
      path: '/family-member-detail/:id',
      name: 'family-member-detail',
      component: FamilyMemberDetailView,
      meta: { title: 'titles.familyMemberDetail' }
    },
    {
      path: '/new-story',
      name: 'new-story',
      component: NewStoryView,
      meta: { title: 'titles.newStory' }
    },
    {
      path: '/story-detail/:id',
      name: 'story-detail',
      component: StoryDetailView,
      meta: { title: 'titles.storyDetail' }
    },
    {
      path: '/edit-story/:id',
      name: 'edit-story',
      component: EditStoryView,
      meta: { title: 'titles.editStory' }
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  const publicRoutes = ['login', 'registration', 'verify-account', 'verify-account-resend', 'reset-password-request', 'reset-password'];
  const authorizationStore = useAuthorizationStore();
  const isLoggedIn = await authorizationStore.checkLoggedIn();

  const titleKey = to.meta.title as string;
  document.title = i18n.global.t(titleKey);

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
