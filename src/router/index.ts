import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/articles/:id",
      name: "article",
      component: () => import("@/views/ArticleView.vue"),
      props: true
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import("@/views/auth/LoginView.vue"),
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import("@/views/auth/RegisterView.vue")
    },
  ],
})

export default router
