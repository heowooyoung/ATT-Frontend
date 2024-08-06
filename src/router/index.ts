import BoardRoutes from '@/board/router/BoardRoutes'
import HomeRoutes from '@/home/router/homeRoutes'
// import NaverAuthenticationRoutes from '@/naverAuthentication/router/AuthenticationRouter'
import GoogleAuthenticationRoutes from '@/googleAuthentication/router/GoogleAuthenticationRoutes'

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AccountRoutes from '@/account/router/AccountRoutes'

const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
  ...BoardRoutes,
  ...AccountRoutes,
  // ...NaverAuthenticationRoutes,
  ...GoogleAuthenticationRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
