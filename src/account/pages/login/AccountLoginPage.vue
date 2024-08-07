<template>
    <v-container>
        <div>
            <v-btn class="google-login-btn" block @click="goToGoogleLogin"></v-btn>
        </div>
        <div>
            <v-btn class="kakao-login-btn" block @click="goToKakaoLogin"></v-btn>
        </div>
    </v-container>
</template>


<script>
import { useStore } from 'vuex'

const googleAuthenticationModule = 'googleAuthenticationModule'

export default {
    setup () {
        const store = useStore()
        const goToGoogleLogin = async () => {
            await store.dispatch("googleAuthenticationModule/requestGoogleOauthRedirectionToDjango")
        }
        const goToKakaoLogin = async () => {
            await store.dispatch("kakaoAuthenticationModule/requestKakaoOauthRedirectionToDjango")
        }
        return {
            goToGoogleLogin,
            goToKakaoLogin
        }
    }
}
</script>



<style scoped>
.google-login-btn {
    background-image: url("@/assets/images/fixed/googleLogin.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    align-items: center;
    justify-content: center;
}
.kakao-login-btn {
    background-image: url("@/assets/images/fixed/kakaologin.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    align-items: center;
    justify-content: center;
}
</style>