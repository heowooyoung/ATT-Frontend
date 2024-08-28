<template>
  <v-app-bar
    app
    class="transparent-nav-bar"
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
          <v-btn v-if="!isAuthenticated" text @click="signIn" class="transparent-btn">
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
      router.push('/post/list')
    }
  },
})
</script>

<style scoped>
.transparent-nav-bar {
  background-color: transparent; 
  box-shadow: none; 
  border: none; 
  padding: 0; 
}

.nav-content-container {
  width: 100%; 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 115px; 
}

.transparent-btn {
  color: black; 
  transition: background-color 0.3s;
}

.transparent-btn:hover {
  background-color: #ADD8E6; 
}

.logo-image {
  height: 60px; 
  width: 80px; 
  object-fit: contain; 
  display: block;
}
</style>