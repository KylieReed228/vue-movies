import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/movies',
        name: 'main',
        component: () => import('@/views/MainPage.vue')
      },
      {
        path: '/movies/:id',
        name: 'moviePage',
        component: () => import('@/views/MoviePage.vue')
      },
      {
        path: '/favourites',
        name: 'favourites',
        component: () => import('@/views/FavouritesPage.vue')
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthPage.vue'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  requiresAuth && !auth.currentUser ? next({ name: 'auth' }) : next()
  if (to.path === '/' && auth.currentUser) {
    next({ name: 'main'})
  }
})

export default router
