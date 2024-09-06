<template>
  <div class="background-container">
    <v-container fluid class="main-container">
      <div class="content-container">
        <div class="overlay-section">
          <div class="title-section">
            <h1 class="title">AI로 시작하는</h1>
            <p class="subtitle">소개팅 연애 시뮬레이션 게임, IF</p>
          </div>
          <v-row class="button-group">
            <v-btn class="btn_basic main-btn" @click="goToGamePage">
              AI 이상형과 대화 시작하기
            </v-btn>
            <v-btn v-if="isAdmin" color="primary" class="btn_basic admin-btn" @click="goToManager">
              IF 관리자 페이지
            </v-btn>
          </v-row>
          <v-row>
            <div class="image-section">
              <div class="ani_clip_action">
                <img v-for="n in 7" :key="n" :src="require(`@/assets/images/talk/talk${n}.png`)" :class="['main-image', `img${n}`]" :alt="`채팅${n}`">
              </div>
            </div>
          </v-row>
        </div>
      </div>
    </v-container>
  </div>
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
.background-container {
  background-image: url('@/assets/images/fixed/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-container {
  border-radius: 20px;
  padding: 20px;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.title-section {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-family: 'LINESeed', sans-serif;
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.2;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-family: 'LINESeed', sans-serif;
  font-size: 32px;
  color: #555;
  line-height: 1.2;
  margin-top: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.button-group {
  margin-top: 30px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn_basic {
  font-family: 'LINESeed';
  font-weight: 700;
  border-radius: 8px;
  background-color:#54a1e4;
  color: white;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-btn {
  font-size: 22px;
  padding: 18px 36px;
  min-width: 350px;
  height: 50px;
}

.admin-btn {
  font-size: 18px;
  padding: 14px 28px;
  min-width: 250px;
  height: 60px;
}

.btn_basic:hover {
  background-color:#54a1e4;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.image-section {
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 30px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.ani_clip_action {
  position: relative;
  width: 600px;
  height: 300px;
}

.main-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
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

@media (max-width: 960px) {
  .title {
    font-size: 48px;
  }

  .subtitle {
    font-size: 24px;
  }

  .main-btn {
    font-size: 20px;
    min-width: 300px;
    height: 60px;
  }

  .admin-btn {
    font-size: 16px;
    min-width: 200px;
    height: 50px;
  }

  .ani_clip_action {
    width: 100%;
    height: 250px;
  }
}
</style>