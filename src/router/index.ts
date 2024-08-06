import BoardRoutes from '@/board/router/BoardRoutes'
import HomeRoutes from '@/home/router/homeRoutes'
import NaverAuthenticationRoutes from '@/naverAuthentication/router/AuthenticationRouter'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
  ...BoardRoutes,
  ...NaverAuthenticationRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
