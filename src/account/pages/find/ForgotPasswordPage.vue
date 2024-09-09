<template>
    <v-container class="forgot-password-container">
      <div class="forgot-password-box">
        <h1>비밀번호 찾기</h1>
        <v-form @submit.prevent="submitEmail" ref="forgotPasswordForm">
          <v-text-field v-model="email" label="이메일을 입력하세요" type="email" :rules="emailRules" required></v-text-field>
          <v-btn type="submit" color="primary" class="submit-btn">비밀번호 찾기</v-btn>
        </v-form>
      </div>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const email = ref('');
  const forgotPasswordForm = ref();
  
  const emailRules = [
    (v: string) => !!v || '이메일을 입력하세요.',
    (v: string) => /.+@.+\..+/.test(v) || '유효한 이메일을 입력하세요.',
  ];
  
  const submitEmail = async () => {
    // 장고에서 비밀번호를 찾고 싶으면 SMTP 라는 설정을 해줘야 한다고 함 ...
    alert('비밀번호 찾기 기능이 현재 준비 중입니다.');
  };
  </script>
  
  <style scoped>
  .forgot-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  .forgot-password-box {
    max-width: 400px;
    width: 100%;
    text-align: center;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
  }
  
  .v-text-field {
    margin-bottom: 20px;
  }
  
  .submit-btn {
    margin-top: 20px;
    width: 100%;
    height: 50px;
  }
  </style>  