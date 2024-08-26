import BoardRoutes from '@/board/router/BoardRoutes'
import HomeRoutes from '@/home/router/homeRoutes'
import NaverAuthenticationRoutes from '@/naverAuthentication/router/NaverAuthenticationRoutes'
import GoogleAuthenticationRoutes from '@/googleAuthentication/router/GoogleAuthenticationRoutes'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AccountRoutes from '@/account/router/AccountRoutes'
import KakaoAuthenticationRoutes from '@/kakaoAuthentication/router/KakaoAuthenticationRoutes'
import UnitytRoutes from '@/components/router/UnityPageRoutes'
import GatherEverythingRoutes from '@/gatherEverything/router/GatherEverythingRoutes'
import IstpChatbotRoutes from '@/chatBot/router/IstpChatBotRoutes'


const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
  ...BoardRoutes,
  ...AccountRoutes,
  ...NaverAuthenticationRoutes,
  ...GoogleAuthenticationRoutes,
  ...KakaoAuthenticationRoutes,
  ...UnitytRoutes,
  ...GatherEverythingRoutes,
  ...IstpChatbotRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
