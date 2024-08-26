<template>
  <div class="home-container">
    <div class="text-container">
      <h2 class="title"> "  I F  " <br/>
      AI 기반 이상형 매칭 게임 서비스 <br/></h2>
      <div style="margin-top: 60px; margin-bottom: 20px"></div>
      <p class="subtitle">SINCE 2024</p>
      <div style="margin-bottom: 10px"></div>
      <p class="description">
        '이프(IF)'는 사용자에게 <br/>
        다양한 유형의 AI 이성과의 소개팅 경험을 제공하고 <br/>
        이상형을 정립할 수 있는 서비스를 제공하고자 합니다.
      </p>
      <div class="buttons">
        <button class="goToGame-button" @click="goToGamePage">
          AI 이상형과 대화 시작하기
        </button>
      </div>
      <img :src="imageSrc" alt="Home Image" class="home-image" />
      </div>

    <div class="footer-container">
      <p class="company-info">
        법인명(상호): 주식회사 어텐션 대표자(성명): 어텐션 사업자 등록번호 안내:
        [123-123-123]
      </p>
      <p class="privacy-info">개인정보보호책임자: 어텐션(team_attention@kakao.com)</p>
      <p class="reserved-info">2024 Attention Korea LLC. All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import imageSrc from "@/assets/images/homeImages/image1.jpg";
import router from "@/router";
import { mapActions, mapState } from "vuex";
const authenticationModule = "authenticationModule";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      imageSrc,
    };
  },
  computed: {
    ...mapState(authenticationModule, ["isAuthenticated"]),
  },
  methods: {
    ...mapActions(authenticationModule, ["requestLogoutToDjango"]),

    goToGamePage() {
      router.push("/game-page");
    },
  },
});
</script>

<style scoped>
.home-container {
  text-align: center;
}

.home-image {
  width: 60%;
  height: auto;
  margin: auto;
  display: block;
  object-fit: cover;
}

.text-container {
  margin-top: 80px;
}

.subtitle {
  font-size: 25px;
  font-weight: bold;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0;
}

.description {
  font-size: 18px;
  color: #777;
}

.goToGame-button{
  background-color: rgb(235, 235, 72);
  color: black;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  width: 300px;
  margin-top: 40px;
  margin-bottom: 50px;
}

.footer-container {
  text-align: center;
  padding: 20px;
  margin-top: 50px;
  background-color: rgb(235, 235, 72);
}

.footer-container p {
  color: #000000;
  font-size: 13px;
}

.company-info,
.contact-info,
.privacy-info,
.additional-links {
  margin: 10px 0;
  color: #555;
}
</style>