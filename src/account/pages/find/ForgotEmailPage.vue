<template>
    <v-container class="forgot-email-container">
      <div class="forgot-email-box">
        <h1>이메일 찾기</h1>
        <v-form @submit.prevent="submitInfo" ref="forgotEmailForm">
          <v-text-field v-model="name" label="이름을 입력하세요" :rules="nameRules" required></v-text-field>
          <v-text-field v-model="nickname" label="닉네임을 입력하세요" :rules="nicknameRules" required></v-text-field>
          <v-btn type="submit" color="primary" class="submit-btn">이메일 찾기</v-btn>
        </v-form>
      </div>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  
  const name = ref('')
  const nickname = ref('')
  const forgotEmailForm = ref()
  
  const nameRules = [(v: string) => !!v || '이름을 입력하세요.']
  const nicknameRules = [(v: string) => !!v || '닉네임을 입력하세요.']
  
  const submitInfo = async () => {
    if (forgotEmailForm.value.validate()) {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/forgot-email/`, {
          name: name.value,
          nickname: nickname.value,
        })
        alert(`이메일: ${response.data.email}`)
      } catch (error: any) {
        console.error('Failed to retrieve email:', error)
        if (error.response && error.response.status === 400) {
          alert('입력한 정보와 일치하는 계정이 없습니다.')
        } else {
          alert('이메일 찾기 중 문제가 발생했습니다.')
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .forgot-email-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  .forgot-email-box {
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