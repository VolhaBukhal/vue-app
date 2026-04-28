import { createRouter, createWebHistory } from 'vue-router'
import TestView from '@/views/TestView.vue'
import TodoView from '../views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TodoView.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: TestView,
    },
  ],
})

export default router
