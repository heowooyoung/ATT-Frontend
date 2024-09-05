<template>
  <v-app-bar
    app
    class="custom-nav-bar"
    flat
    elevation="0"
  >
    <v-container class="nav-content-container">
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <v-btn @click="goToHome" class="transparent-btn" text>
            <img
              :src="require('@/assets/images/logo/if_logo.png')"
              alt="IF 로고"
              class="logo-image"
            />
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn text @click="goToPostPage" class="transparent-btn">
            <v-icon left>mdi-forum</v-icon>
            <span>익명 게시판</span>
          </v-btn>
          <v-btn v-if="!isAuthenticated" text @click="signIn" class="login-btn">
            <v-icon left>mdi-login</v-icon>
            <span>로그인</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import router from '@/router'
import { mapState, mapActions } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationMenuBar',
  computed: {
    ...mapState('authenticationModule', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('authenticationModule', ['requestLogoutToDjango']),
    goToHome() {
      router.push('/')
    },
    signIn() {
      router.push('/account/login')
    },
    goToPostPage() {
      router.push('/board/list')
    }
  },
})
</script>

<style scoped>
.custom-nav-bar {
  background-color: white; /* 배경을 흰색으로 변경 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */
  border-bottom: 1px solid #e0e0e0; /* 하단에 얇은 경계선 추가 */
}

.nav-content-container {
  width: 100%; 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 20px; /* 패딩을 조금 줄임 */
}

.transparent-btn {
  color: black; 
  transition: background-color 0.3s;
}

.transparent-btn:hover {
  background-color: rgba(0, 0, 0, 0.05); /* 배경색을 조금 어둡게 */
}

.login-btn {
  color: white;
  background-color: #4A90E2; /* 로그인 버튼 색상 */
  border-radius: 4px;
  padding: 8px 16px;
}

.login-btn:hover {
  background-color: #357ABD; /* 로그인 버튼 호버 색상 */
}

.logo-image {
  height: 50px; /* 로고 높이 조정 */
  width: auto; /* 비율을 유지하면서 너비 조정 */
  object-fit: contain;
  display: block;
}
</style>