import { createRouter, createWebHistory } from 'vue-router'
import HomepageView from '@/views/HomepageView.vue'
import LoginView from '@/views/authorization/LoginView.vue'
import RegistrationView from '@/views/authorization/RegistrationView.vue'

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
    }
  ],
})

export default router

