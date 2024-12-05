import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/view/HomeView.vue'
import { useUserStore } from '@/store/UserStore'

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
      component: () => import("@/view/ArticleView.vue"),
      props: true
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import("@/view/auth/LoginView.vue"),
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import("@/view/auth/RegisterView.vue")
    },
    {
      path: '/my/articles',
      name: 'my-articles',
      component: () => import("@/view/MyArticlesView.vue"),
      beforeEnter: kickIfNotAuthorized
    },
    {
      path: '/my/articles/create',
      name: 'create-article',
      component: () => import("@/view/CreateArticleView.vue"),
      beforeEnter: kickIfNotAuthorized
    },
    {
      path: '/my/profile',
      name: 'my-profile',
      component: () => import("@/view/MyProfileView.vue"),
      beforeEnter: kickIfNotAuthorized
    }
  ],
})

function kickIfNotAuthorized(to: any, from: any, next: any) {
  const userStorage = useUserStore();
  if (userStorage.hasUser()) {
    next();
    return;
  }

  router.push({name: 'login'})
}

export default router
