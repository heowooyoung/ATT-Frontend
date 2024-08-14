import { ActionContext } from "vuex"
import { AuthenticationState } from "@/authentication/store/states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type AuthenticationActions = {
    requestNaverOauthRedirectionToDjango(): Promise<void>
    requestAccessTokenToDjangoRedirection(context: ActionContext<AuthenticationState, any>, payload: { code: string }): Promise<void>
    requestNaverUserInfoToDjango(context: ActionContext<AuthenticationState, any>): Promise<any>
}

const actions: AuthenticationActions = {
    async requestNaverOauthRedirectionToDjango(): Promise<void> {
        console.log('requestNaverOauthRedirectionToDjango()')
        return axiosInst.djangoAxiosInst.get('/naver_oauth/naver').then((res) => {
            console.log('url:', res.data.url)
            window.location.href = res.data.url
        })
    },
    async requestAccessTokenToDjangoRedirection(
        context: ActionContext<AuthenticationState, any>,
        payload: { code: string }): Promise<void> {

        try {
            console.log('requestAccessTokenToDjangoRedirection()')
            const { code } = payload

            const response = await axiosInst.djangoAxiosInst.post(
                '/naver_oauth/naver/access-token', { code })
            localStorage.setItem("accessToken", response.data.accessToken.access_token)
        } catch (error) {
            console.log('Access Token 요청 중 문제 발생:', error)
            throw error
        }
    },
    async requestNaverUserInfoToDjango(
        context: ActionContext<AuthenticationState, any>): Promise<any> {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const userInfoResponse: AxiosResponse<any> =
                await axiosInst.djangoAxiosInst.post('/naver_oauth/naver/user-info', { access_token: accessToken })

            const userInfo = userInfoResponse.data.user_info

            return userInfo
        } catch (error) {
            alert('사용자 정보 가져오기 실패!')
            throw error
        }
    },
};

export default actions;