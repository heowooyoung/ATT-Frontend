import accountModule from '@/account/store/accountModule'
import authenticationModule from '@/authentication/store/authenticationModule'
import boardModule from '@/board/store/boardModule'
import userInputModule from '@/components/store/userInputModule'
import aiCommandModule from '@/gatherEverything/store/aiCommandModule'
import googleAuthenticationModule from '@/googleAuthentication/store/googleAuthenticationModule'
import kakaoAuthenticationModule from '@/kakaoAuthentication/store/kakaoAuthenticationModule'
import naverAuthenticationModule from '@/naverAuthentication/store/naverAuthenticationModule'
import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    boardModule,
    accountModule,
    authenticationModule,
    googleAuthenticationModule,
    kakaoAuthenticationModule,
    naverAuthenticationModule,
    aiCommandModule,
    userInputModule, // Chatbot으로 통합
  }
})
