import BoardRoutes from '@/board/router/BoardRoutes'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // 항상 도메인의 router 추가했으면 main router 에도 추가해줘야함
  ...BoardRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
