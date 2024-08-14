import { ActionContext } from "vuex"
import { AuthenticationState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type AuthenticationActions = {
    requestAddRedisAccessTokenToDjango(context: ActionContext<AuthenticationState, any>,
        { email, accessToken }: { email: string, accessToken: string }): Promise<any>
    requestLogoutToDjango(context: ActionContext<AuthenticationState, any>, userToken: string): Promise<void>
}

const actions: AuthenticationActions = {
    async requestAddRedisAccessTokenToDjango(
        { commit, state }: ActionContext<AuthenticationState, any>,
        { email, accessToken }: { email: string, accessToken: string }): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axiosInst.djangoAxiosInst.post(
                '/redis_token/redis-access-token', {
                email: email,
                accessToken: accessToken
            });


            localStorage.removeItem("accessToken")
            localStorage.setItem("userToken", response.data.userToken)

            console.log('userToken:', response.data.userToken)

            commit('REQUEST_IS_AUTHENTICATED_TO_DJANGO', true);
            return response.data;
        } catch (error) {
            console.error('Error adding redis access token:', error);
            throw error;
        }
    },
    async requestLogoutToDjango(
        context: ActionContext<AuthenticationState, any>, userToken: string): Promise<void> {
        try {
            const userToken = localStorage.getItem("userToken")

            const res = await axiosInst.djangoAxiosInst.post('/redis_token/logout', { userToken: userToken })
            console.log('res:', res.data.isSuccess)
            if (res.data.isSuccess === true) {
                context.commit('REQUEST_IS_AUTHENTICATED_TO_DJANGO', false)
            }
        } catch (error) {
            console.error('requestLogoutToDjango() 중 에러 발생:', error)
            throw error
        }
        localStorage.removeItem("userToken")
    }
}

export default actions;