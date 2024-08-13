import { ActionContext } from "vuex"
import { AuthenticationState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type AuthenticationActions = {
    requestAddRedisAccessTokenToDjango(context: ActionContext<AuthenticationState, any>,
        { email, accessToken }: { email: string, accessToken: string }): Promise<any>
}

const actions: AuthenticationActions = {
    async requestAddRedisAccessTokenToDjango(
        { commit, state }: ActionContext<AuthenticationState, any>,
        { email, accessToken }: { email: string, accessToken: string }): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axiosInst.djangoAxiosInst.post(
                '/oauth/redis-access-token/', {
                email: email,
                accessToken: accessToken
            });

            console.log('userToken:', response.data.userToken)

            localStorage.removeItem("accessToken")
            localStorage.setItem("userToken", response.data.userToken)
            commit('REQUEST_IS_AUTHENTICATED_TO_DJANGO', true);
            return response.data;
        } catch (error) {
            console.error('Error adding redis access token:', error);
            throw error;
        }
    },
}

export default actions;