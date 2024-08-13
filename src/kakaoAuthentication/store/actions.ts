import { ActionContext } from "vuex"
import { KakaoAuthenticationState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type KakaoAuthenticationActions = {
    requestKakaoOauthRedirectionToDjango(): Promise<void>
    requestAccessTokenToDjangoRedirection(context: ActionContext<KakaoAuthenticationState, any>, payload: { code: string }): Promise<void>
    requestKakaoUserInfoToDjango(context: ActionContext<KakaoAuthenticationState, any>): Promise<any>
}

const actions: KakaoAuthenticationActions = {
    async requestKakaoOauthRedirectionToDjango(): Promise<void> {
        console.log('requestKakaoOauthRedirectionToDjango()')
        return axiosInst.djangoAxiosInst.get('/kakao_oauth/kakao').then((res) => {
            console.log('url:', res.data.url)
            window.location.href = res.data.url
        })
    },
    async requestAccessTokenToDjangoRedirection(
        context: ActionContext<KakaoAuthenticationState, any>,
        payload: { code: string }): Promise<void> {

        try {
            console.log('requestAccessTokenToDjangoRedirection()')
            const { code } = payload

            const response = await axiosInst.djangoAxiosInst.post(
                '/kakao_oauth/kakao/access-token', { code })
            localStorage.setItem("accessToken", response.data.accessToken.access_token)
        } catch (error) {
            console.log('Access Token 요청 중 문제 발생:', error)
            throw error
        }
    },
    async requestKakaoUserInfoToDjango(
        context: ActionContext<KakaoAuthenticationState, any>): Promise<any> {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const userInfoResponse: AxiosResponse<any> =
                await axiosInst.djangoAxiosInst.post('/kakao_oauth/kakao/user-info', { access_token: accessToken })

            const userInfo = userInfoResponse.data.user_info

            return userInfo
        } catch (error) {
            alert('사용자 정보 가져오기 실패!')
            throw error
        }
    },
};

export default actions;