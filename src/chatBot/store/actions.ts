import { ActionContext } from "vuex"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { UserInputState } from "./states"

export type UserInputActions = {
    requestResponseToFastAPI(
        context: ActionContext<UserInputState, any>,
        payload: { data: string }): Promise<string>
}

const actions: UserInputActions = {
    // 이 부분은 postman의 역할과 같음
    // 이 함수 자체는 postman에게 true만 반환했으므로, 결과를 보고싶다면 istp-result에게도 쏴줘야 함
    async requestResponseToFastAPI(
        context: ActionContext<UserInputState, any>,
        payload: { data: string }): Promise<string> {
        try {
            console.log('requestResponseToFastAPI()')
            const { data } = payload
            console.log("userInput:", data)
            const command = 7

            const response = await axiosInst.fastapiAxiosInst.post(
                '/request-ai-command', { command, "data":[data] })
            return response.data
        } catch (error) {
            console.log('requestInferToFastAPI() 중 문제 발생:', error)
            throw error
        }
    },
}

export default actions