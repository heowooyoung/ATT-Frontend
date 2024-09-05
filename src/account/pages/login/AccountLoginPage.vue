<template>
<v-container class="login-container">
<div class="login-box">
<h1>로그인</h1>
<p class="description">이메일과 비밀번호를 입력하세요.</p>
<v-form @submit.prevent="login" ref="loginForm">
    <v-text-field
    v-model="email"
    label="이메일"
    type="email"
    :rules="emailRules"
    required
    ></v-text-field>
    <v-text-field
    v-model="password"
    label="비밀번호"
    type="password"
    :rules="passwordRules"
    required
    ></v-text-field>
    <div class="forgot-password">
    <a href="#">비밀번호를 잊으셨나요?</a>
    </div>
    <v-btn class="login-btn" type="submit">로그인</v-btn>
</v-form>
    <p class="signup-link">
    계정이 있으신가요? <router-link to="/account/signup">계정생성</router-link>
    </p>
<div class="social-login-buttons">
    <v-img class="google-login-btn" block @click="goToGoogleLogin"></v-img>
    <v-img class="kakao-login-btn" block @click="goToKakaoLogin"></v-img>
    <v-img class="naver-login-btn" block @click="goToNaverLogin"></v-img>
</div>
</div>
</v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const email = ref('')
const password = ref('')
const loginForm = ref()

const emailRules = [
(v: string) => !!v || '이메일을 입력하세요.',
(v: string) => /.+@.+\..+/.test(v) || '유효한 이메일을 입력하세요.',
]
const passwordRules = [(v: string) => !!v || '비밀번호를 입력하세요.']

const goToGoogleLogin = async () => {
await store.dispatch("googleAuthenticationModule/requestGoogleOauthRedirectionToDjango")
}

const goToKakaoLogin = async () => {
await store.dispatch("kakaoAuthenticationModule/requestKakaoOauthRedirectionToDjango")
}

const goToNaverLogin = async () => {
await store.dispatch("naverAuthenticationModule/requestNaverOauthRedirectionToDjango")
}

const goToJWTLogin = async () => {
await store.dispatch("jwtAuthenticationModule/requestjwtOauthRedirectionToDjango")
}

const login = async () => {
if (loginForm.value.validate()) {
console.log('Login with:', email.value, password.value)
}
}
</script>

<style scoped>
.login-container {
display: flex;
justify-content: center;
margin-top: 10vh;
}

.login-box {
max-width: 400px;
width: 100%;
text-align: center;
}

h1 {
margin-bottom: 10px;
font-size: 24px;
font-weight: bold;
}

.description {
margin-bottom: 20px;
color: #666;
}

.v-form {
margin-bottom: 20px;
}

.forgot-password {
text-align: right;
margin-bottom: 20px;
}

.forgot-password a {
font-size: 12px;
color: #666;
text-decoration: none;
}

.login-btn {

background-color: #4a4a4a;
color: white;
border-radius: 4px;
font-size: 16px;
margin-bottom: 20px;
height: 50px;
width: 100%; 
margin-top: 10px;
margin-left: -5px;
}

.signup-link {
margin-top: 20px;
font-size: 14px;
color: #666;
}

.signup-link a {
text-decoration: none;
color: #007bff;
}

.social-login-buttons {
display: flex;
flex-direction: column;
align-items: center;
}

.google-login-btn,
.kakao-login-btn,
.naver-login-btn {
background-size: contain;
background-repeat: no-repeat;
background-position: center;
height: 50px;
width: 50%;
margin-top: 10px;
margin-left: -5px;
}

.google-login-btn {
background-image: url("@/assets/images/fixed/googleLogin.png");
}

.kakao-login-btn {
background-image: url("@/assets/images/fixed/kakaoLogin.png");
}

.naver-login-btn {
background-image: url("@/assets/images/fixed/naverLogin.png");
}
</style>