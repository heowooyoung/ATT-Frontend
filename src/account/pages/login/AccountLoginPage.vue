<template>
<v-container class="login-container">
    <div class="login-box">
    <h1>로그인</h1>
    <p class="description">이메일과 비밀번호를 입력하세요.</p>
    <v-form @submit.prevent="login" ref="loginForm">
        <v-text-field v-model="email" label="이메일" type="email" :rules="emailRules" required></v-text-field>
        <v-text-field v-model="password" label="비밀번호" type="password" :rules="passwordRules" required></v-text-field>
        <div class="forgot-links">
        <a href="#" @click.prevent="forgotEmail">이메일을 잊으셨나요?</a>
        <br>
        <a href="#" @click.prevent="forgotPassword">비밀번호를 잊으셨나요?</a>
        </div>
        <v-btn class="login-btn" type="submit">로그인</v-btn>
    </v-form>
    <p class="signup-link">
        계정이 없으신가요? <router-link to="/account/signup">계정생성</router-link>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const email = ref('');
const password = ref('');
const loginForm = ref();

const ADMIN_EMAIL = process.env.VUE_APP_ADMIN_EMAIL;  

const emailRules = [
(v: string) => !!v || '이메일을 입력하세요.',
(v: string) => /.+@.+\..+/.test(v) || '유효한 이메일을 입력하세요.',
];
const passwordRules = [(v: string) => !!v || '비밀번호를 입력하세요.'];

const login = async () => {
if (loginForm.value.validate()) {
    try {
    const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/auth/`, {
        email: email.value,
        password: password.value,
    });

    localStorage.setItem('access', response.data.token.access);
    localStorage.setItem('refresh', response.data.token.refresh);

    const isAdmin = email.value === ADMIN_EMAIL;  
    store.commit('account/SET_USER_DATA', { isAdmin });

    if (isAdmin) {
        await router.push('/manager');
    } else {
        await router.push('/game-page');
    }
    } catch (error: any) {
    console.error('Login failed:', error);

    if (error.response) {
        if (error.response.data.detail === "Invalid credentials") {
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
        } else if (error.response.status === 400) {
        if (error.response.data.errors?.email) {
            alert('이메일이 잘못되었습니다.');
        } else if (error.response.data.errors?.password) {
            alert('비밀번호가 잘못되었습니다.');
        }
        }
    } else {
        alert('로그인 중 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    }
    }
}
};

const forgotPassword = async () => {
try {
    await router.push('/account/forgot-password');
} catch (error: any) {
    console.error('Error navigating to forgot password page:', error);
    alert('비밀번호 찾기 페이지로 이동하는 중 문제가 발생했습니다.');
}
};

const forgotEmail = async () => {
try {
    await router.push('/account/forgot-email');
} catch (error: any) {
    console.error('Error navigating to forgot email page:', error);
    alert('이메일 찾기 페이지로 이동하는 중 문제가 발생했습니다.');
}
};

const goToGoogleLogin = async () => {
await store.dispatch("googleAuthenticationModule/requestGoogleOauthRedirectionToDjango");
};

const goToKakaoLogin = async () => {
await store.dispatch("kakaoAuthenticationModule/requestKakaoOauthRedirectionToDjango");
};

const goToNaverLogin = async () => {
await store.dispatch("naverAuthenticationModule/requestNaverOauthRedirectionToDjango");
};

</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    margin-top: 2vh;
    min-height: 2vh;
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

.forgot-links {
    text-align: center;
    margin-bottom: 20px;
}

.forgot-links a {
    font-size: 12px;
    color: #666;
    text-decoration: none;
    margin-left: 10px;
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