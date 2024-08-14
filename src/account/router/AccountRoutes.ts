import AccountLoginPage from "@/account/pages/login/AccountLoginPage.vue"
import GoogleAccountRegisterPage from "@/account/pages/register/GoogleAccountRegisterPage.vue"
import KakaoAccountRegisterPage from "@/account/pages/register/KakaoAccountRegisterPage.vue"
import NaverAccountRegisterPage from "@/account/pages/register/NaverAccountRegisterPage.vue"

const AccountRoutes = [
    {
        path: '/account/login',
        name: 'AccountLoginPage',
        component: AccountLoginPage
    },
    {
        path: '/account/google-register',
        name: 'GoogleAccountRegisterPage',
        component: GoogleAccountRegisterPage
    },
    {
        path: '/account/kakao-register',
        name: 'KakaoAccountRegisterPage',
        component: KakaoAccountRegisterPage
    },
    {
        path: '/account/naver-register',
        name: 'NaverAccountRegisterPage',
        component: NaverAccountRegisterPage
    },
]

export default AccountRoutes