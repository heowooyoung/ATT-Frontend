import { ActionContext } from "vuex"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { UserInputState } from "./states"

export type UserInputActions = {
    sendMessageToFastAPI(
        context: ActionContext<UserInputState, any>,
        payload: { data: string }): Promise<string>
    requestAnswerToFastAPI(context: ActionContext<UserInputState, any>): Promise<string>
}

const actions: UserInputActions = {
    // 이 부분은 postman의 역할과 같음
    // 이 함수 자체는 postman에게 true만 반환했으므로, 결과를 보고싶다면 istp-result에게도 쏴줘야 함
    async sendMessageToFastAPI(
        context: ActionContext<UserInputState, any>,
        payload: { data: string }): Promise<string> {
        try {
            console.log('sendMessageToFastAPI()')
            const { data } = payload
            console.log("userInput:", data)
            const command = 8 // 7 : istp,   8 : enfp

            const response = await axiosInst.fastapiAxiosInst.post(
                '/request-ai-command', { command, "data": [data] })
            return response.data
        } catch (error) {
            // Axios time out 나는 이슈 발생 (2500ms) 수정하기
            console.log('sendMessageToFastAPI() 중 문제 발생:', error)
            throw error
        }
    },
    async requestAnswerToFastAPI(context: ActionContext<UserInputState, any>): Promise<string> {
        try {
            console.log('requestAnswerToFastAPI()')
            const response = await axiosInst.fastapiAxiosInst.post(
                '/enfp-test-result')
            console.log('actions ENFP Answer: ', response.data)
            return response.data
        } catch (error) {
            console.log('requestAnswerToFastAPI() 중 문제 발생:', error)
            throw error
        }
    }
}

export default actions