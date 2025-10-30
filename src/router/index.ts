import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Editor from '@/Editor.vue'
import About from '@/views/About.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/editor', name: 'Editor', component: Editor }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
