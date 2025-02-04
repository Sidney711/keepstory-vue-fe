import { createRouter, createWebHistory } from 'vue-router'
import HomepageView from '@/views/HomepageView.vue'
import LoginView from '@/views/authorization/LoginView.vue'

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
  ],
})

export default router

