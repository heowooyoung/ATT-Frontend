import KakaoRedirection  from "../redirection/KakaoRedirection.vue";

const KakaoAuthenticationRoutes = [
    {
        path: '/kakao_oauth/kakao-access-token',
        name: 'KakaoRedirecton',
        component: KakaoRedirection
    },
]

export default KakaoAuthenticationRoutes
