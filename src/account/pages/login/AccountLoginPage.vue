<template>
    <v-container class="login-container">
        <div>
            <v-img class="google-login-btn" block @click="goToGoogleLogin"></v-img>
            <v-img class="kakao-login-btn" block @click="goToKakaoLogin"></v-img>
            <v-img class="naver-login-btn" block @click="goToNaverLogin"></v-img>
        </div>
    </v-container>
</template>

<script>
import { useStore } from 'vuex'

const googleAuthenticationModule = 'googleAuthenticationModule'
const kakaoAuthenticationModule = 'kakaoAuthenticationModule'

export default {
    setup () {
        const store = useStore()
        const goToGoogleLogin = async () => {
            await store.dispatch("googleAuthenticationModule/requestGoogleOauthRedirectionToDjango")
        }
        const goToKakaoLogin = async () => {
            await store.dispatch("kakaoAuthenticationModule/requestKakaoOauthRedirectionToDjango")
        }
        const goToNaverLogin = async () => {
            await store.dispatch("naverAuthenticationModule/requestNaverOauthRedirectionToDjango")
        }
        return {
            goToGoogleLogin,
            goToKakaoLogin,
            goToNaverLogin,
        }
    }
}
</script>


<style scoped>
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30vh;
}

.google-login-btn {
    background-image: url("@/assets/images/fixed/googleLogin.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 50px; /* 버튼 높이 조정 */
    width: 200px; /* 버튼 너비 조정 */
}
.kakao-login-btn {
    background-image: url("@/assets/images/fixed/kakaoLogin.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 50px; /* 버튼 높이 조정 */
    width: 200px; /* 버튼 너비 조정 */
    margin-top: 10px;
}
.naver-login-btn {
    background-image: url("@/assets/images/fixed/naverLogin.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 50px; /* 버튼 높이 조정 */
    width: 200px; /* 버튼 너비 조정 */
    margin-top: 10px;
}
</style>