<template>
  <v-container fluid class="main-container">
    <div class="content-container">
      <div class="overlay-section">
        <div class="title-section">
          <h1 class="title">AI로 시작하는</h1>
          <p class="subtitle">소개팅 연애 시뮬레이션 게임, IF</p>
        </div>
        <v-row class="button-group">
          <v-btn color="primary" class="btn_basic" @click="goToGamePage">
            AI 이상형과 대화 시작하기
          </v-btn>
          <v-btn v-if="isAdmin" color="primary" class="btn_basic" @click="goToManager">
            IF 관리자 페이지
          </v-btn>
        </v-row>
      </div>
      <div class="image-section">
        <div class="ani_clip_action">
          <img :src="require('@/assets/images/talk/img-key-slide01-removebg-preview.png')" class="main-image img1" alt="채팅1">
          <img :src="require('@/assets/images/talk/img-key-slide02-removebg-preview.png')" class="main-image img2" alt="채팅2">
          <img :src="require('@/assets/images/talk/img-key-slide03-removebg-preview.png')" class="main-image img3" alt="채팅3">
          <img :src="require('@/assets/images/talk/img-key-slide04-removebg-preview.png')" class="main-image img4" alt="채팅4">
          <img :src="require('@/assets/images/talk/img-key-slide05-removebg-preview.png')" class="main-image img5" alt="채팅5">
          <img :src="require('@/assets/images/talk/img-key-slide06-removebg-preview.png')" class="main-image img6" alt="채팅6">
          <img :src="require('@/assets/images/talk/img-key-slide07-removebg-preview.png')" class="main-image img7" alt="채팅7">
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import { mapState } from "vuex";
const authenticationModule = "authenticationModule";

export default defineComponent({
  name: 'HomeView',
  methods: {
    goToManager() {
      router.push('/manager')
    },
    goToGamePage() {
      if (this.isAuthenticated) { router.push('/game-page') }
      else { router.push('/account/login')}
    },
  },
  computed: {
      ...mapState(authenticationModule, ["isAuthenticated", "isAdmin"]),
    },
});
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  line-height: 1;
  box-sizing: border-box;
  font-family: 'LINESeed';
  font-feature-settings: "clig" off, "liga" off;
  color: #000;
  -webkit-font-smoothing: antialiased;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
}

.content-container {
  display: flex;
  flex-direction: row;
  width: 80%;
  max-width: 1200px;
  height: 60vh;
}

.title-section {
  position: relative;
  z-index: 2;
  text-align: left;
}

.title {
  font-family: 'LINESeed';
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.2;
  color: black;
}

.subtitle {
  font-family: 'LINESeed';
  font-size: 38px;
  color: black;
  line-height: 1.2;
  margin-top: 0;
}

.button-group {
  margin-top: 20px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
}

.btn_basic, .btn_outlined {
  font-family: 'LINESeed';
  font-size: 18px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  height: 50px;
}

.btn_basic {
  background-color: #1E90FF;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-out;
}

.btn_basic:hover {
  background-color: #4682B4;
}

.btn_outlined {
  border: 2px solid #1E90FF;
  color: #1E90FF;
  background-color: transparent;
  transition: background-color 0.2s ease-out, color 0.2s ease-out;
}

.btn_outlined:hover {
  background-color: #1E90FF;
  color: white;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.ani_clip_action {
  position: relative;
  width: 379px;
  height: 658px;
  margin: 0 auto;
  padding-top: 20px;
}

.img1, .img2, .img3, .img4, .img5, .img6, .img7 {
  position: absolute;
  width: 379px;
  height: 658px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.img1 { opacity: 1; } 
.img2 { animation: fadeIn 1s forwards 2s; }
.img3 { animation: fadeIn 1s forwards 4s; }
.img4 { animation: fadeIn 1s forwards 6s; }
.img5 { animation: fadeIn 1s forwards 8s; }
.img6 { animation: fadeIn 1s forwards 10s; }
.img7 { animation: fadeIn 1s forwards 12s; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.main-image {
  max-width: 100%;
  height: auto;
}
</style>