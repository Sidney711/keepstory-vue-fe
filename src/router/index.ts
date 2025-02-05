import { createRouter, createWebHistory } from 'vue-router'
import HomepageView from '@/views/HomepageView.vue'
import LoginView from '@/views/authorization/LoginView.vue'
import RegistrationView from '@/views/authorization/RegistrationView.vue'
import VerifyAccountView from '@/views/authorization/VerifyAccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomepageView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/verify-account',
      name: 'VerifyAccount',
      component: VerifyAccountView,
    },
  ],
})

// Nastavení veřejných tras, ke kterým má přístup nepřihlášený uživatel
const publicPages = ['login', 'registration', 'verify-account']

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt-authorization-token')

  if (token && publicPages.includes(to.name as string)) {
    return next({ name: 'homepage' })
  }

  if (!token && !publicPages.includes(to.name as string)) {
    return next({ name: 'login' })
  }

  next()
})

export default router
