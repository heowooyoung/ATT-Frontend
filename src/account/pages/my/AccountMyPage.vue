<template>
  <v-card class="id-card" max-width="300">
    <div class="company-logo">MY PAGE</div>
    <v-img :src="imageSrc"></v-img>
    <v-card-text>
      <h2 class="text-nickname">Nickname</h2>
      <p class="text-user-info">Email: team_attention@google.com</p>
      <p class="text-user-info">Gender: Male</p>
      <v-divider class="my-3"></v-divider>
    </v-card-text>
  </v-card>
</template>
  
  <script>
  import { mapActions } from "vuex";
  
  const accountModule = "accountModule";
  
  export default {
    data() {
      return {
        imageSrc: require("@/assets/images/fixed/profile_img.png"),
        email: "",
        nickname: "",
      };
    },
    async created() {
      try {
        const nickname = await this.requestNicknameToDjango();
        const email = await this.requestEmailToDjango();
        this.nickname = nickname;
        this.email = email;
      } catch (error) {
        console.log("사용자 정보를 가져오는 과정에서 에러 발생:", error);
      }
    },
    methods: {
      ...mapActions(accountModule, [
        "requestNicknameToDjango",
        "requestEmailToDjango",
      ]),
    },
  };
  </script>
  
  <style scoped>
  .id-card-container {
    text-align: center;
    position: relative;
    padding-top: 50px;
    display: flex;
    justify-content: center;
    margin-top: 170px;
  }

  .text-nickname {
    text-align: center;
  }

  .text-user-info {
    margin-top: 10px;
    text-align: left;
    font-weight: bold;
  }
  
  .company-logo {
    text-align: center;
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    font-weight: bold;
    font-size: 1.2em;
    color: #333;
  }
  </style>