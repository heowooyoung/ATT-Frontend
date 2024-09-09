import AccountLoginPage from "@/account/pages/login/AccountLoginPage.vue"
import GoogleAccountRegisterPage from "@/account/pages/register/GoogleAccountRegisterPage.vue"
import KakaoAccountRegisterPage from "@/account/pages/register/KakaoAccountRegisterPage.vue"
import NaverAccountRegisterPage from "@/account/pages/register/NaverAccountRegisterPage.vue"
import AccountMyPage from "@/account/pages/my/AccountMyPage.vue"
import AccountSignUpPage from "@/account/pages/singup/AccountSignUpPage.vue"
import ManagerView from "@/account/pages/admin/ManagerView.vue"
import ForgotPasswordPage from "@/account/pages/find/ForgotPasswordPage.vue"
import ForgotEmailPage from "@/account/pages/find/ForgotEmailPage.vue"

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
    {
        path: '/account/mypage',
        name: 'AccountMyPage',
        component: AccountMyPage
    },
    {
        path: '/account/signup',
        name: 'AccountSignUpPage',
        component: AccountSignUpPage
    },
    {
        path: '/manager',
        name: 'manager',
        component: ManagerView
    },
    {
        path: '/account/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPasswordPage,
      },
      {
        path: '/account/forgot-email',
        name: 'ForgotEmail',
        component: ForgotEmailPage,
      },
]

export default AccountRoutes