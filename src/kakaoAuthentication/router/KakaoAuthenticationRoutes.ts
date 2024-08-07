import KakaoRedirection  from "../redirection/KakaoRedirection.vue";

const KakaoAuthenticationRoutes = [
    {
        path: '/kakaoOauth/kakao-access-token',
        name: 'KakaoRedirecton',
        component: KakaoRedirection
    },
]

export default KakaoAuthenticationRoutes
