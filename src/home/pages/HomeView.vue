<template>
  <v-container fluid class="main-container">
    <div class="content-container">
      <!-- 왼쪽 텍스트 및 이미지 -->
      <div class="text-section">
        <img :src="require('@/assets/images/icon/icon.png')" class="icon img" alt="아이콘">
        <h1 class="title">AI로 시작하는</h1>
        <p class="subtitle">소개팅 연애 시뮬레이션 게임, IF</p>

        <!-- 버튼들 -->
        <v-row class="button-group" justify="start">
          <v-btn color="primary" class="mr-4 btn_basic" @click="startGame">
            게임 시작
          </v-btn>
          <v-btn outlined class="btn_outlined" @click="learnMore">
            더 알아보기
          </v-btn>
        </v-row>
      </div>
      
      <!-- 오른쪽 이미지 -->
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

export default defineComponent({
  name: 'HomeView',
  methods: {
    startGame() {
      router.push('/game-page')
    },
    learnMore() {
      router.push('/')
    },
  },
});
</script>

<style scoped>
/* 기본 스타일 리셋 */
html, body {
  margin: 0;
  padding: 0;
  line-height: 1;
  box-sizing: border-box;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", sans-serif;
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
  min-height: 100vh;
}

.content-container {
  display: flex;
  flex-direction: row;
  width: 80%;
  max-width: 1200px;
  height: 60vh;
}

.text-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  position: relative;
  top: 50px;
}

.icon.img {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100px;
  margin-top: -50px;
  margin-bottom: 50px;
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

.title {
  font-family: 'Arial', sans-serif;
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.2;
}

.subtitle {
  font-family: 'Arial', sans-serif;
  font-size: 38px;
  color: #3333FF;
  line-height: 1.2;
  margin-top: 0;
}

.button-group {
  margin-top: 20px;
}

.btn_basic, .btn_outlined {
  font-size: 18px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 154px;
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
</style>