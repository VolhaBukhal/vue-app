import { createRouter, createWebHistory } from 'vue-router'

import TodoView from '@/views/TodoView.vue'
import BooksView from '@/views/BooksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TodoView,
    },
    {
      path: '/list',
      name: 'list',
      component: BooksView,
    },
  ],
})

export default router
