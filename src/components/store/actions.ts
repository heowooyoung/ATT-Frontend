import { ActionContext } from "vuex"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { UserInputState } from "./states"

export type UserInputActions = {
    sendMessageToFastAPI(
        context: ActionContext<UserInputState, any>,
        payload: { data: string }): Promise<string>
    requestAnswerToFastAPI(context: ActionContext<UserInputState, any>): Promise<string>
    requestDateQuestionToFastAPI(
        context: ActionContext<UserInputState, any>,
        payload: { data: string }): Promise<string>
    requestDateAnswerToFastAPI(context: ActionContext<UserInputState, any>): Promise<string>
    requestLocationQuestionToFastAPI(
        context: ActionContext<UserInputState, any>,
        payload: { data: string }): Promise<string>
    requestLocationAnswerToFastAPI(context: ActionContext<UserInputState, any>): Promise<string>
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
            const command = 7 // 7 : istp,   8 : enfp

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
                '/istp-test-result')
            console.log('actions ENFP Answer: ', response.data)
            return response.data
        } catch (error) {
            console.log('requestAnswerToFastAPI() 중 문제 발생:', error)
            throw error
        }
    },
    async requestDateQuestionToFastAPI(
        context: ActionContext<UserInputState, any>,
        payload: { data: string }): Promise<string> {
        try {
            console.log('sendDateQuestionToFastAPI()')
            const { data } = payload
            const command = 22 // 22 : date question command 

            const response = await axiosInst.fastapiAxiosInst.post(
                '/request-ai-command', { command, "data": data })
            console.log("날짜받기 응답", response.data)
            return response.data
        } catch (error) {
            console.log('sendDateQuestionToFastAPI() 중 문제 발생:', error)
            throw error
        }
    },
    async requestDateAnswerToFastAPI(context: ActionContext<UserInputState, any>): Promise<string> {
        try {
            console.log('requestDateAnswerToFastAPI()')
            const response = await axiosInst.fastapiAxiosInst.post(
                '/date-qna-result')
            console.log('Date Answer: ', response.data)
            return response.data
        } catch (error) {
            console.log('requestDateAnswerToFastAPI() 중 문제 발생:', error)
            throw error
        }
    },
    async requestLocationQuestionToFastAPI(
        context: ActionContext<UserInputState, any>,
        payload: { data: string }): Promise<string> {
        try {
            console.log('sendLocationQuestionToFastAPI()')
            const { data } = payload
            const command = 23 // 23 : location question command 

            const response = await axiosInst.fastapiAxiosInst.post(
                '/request-ai-command', { command, "data": data })
            console.log("장소받기 응답", response.data)
            return response.data
        } catch (error) {
            console.log('sendLocationQuestionToFastAPI() 중 문제 발생:', error)
            throw error
        }
    },

    async requestLocationAnswerToFastAPI(context: ActionContext<UserInputState, any>): Promise<string> {
        try {
            console.log('requestLocationAnswerToFastAPI()')
            const response = await axiosInst.fastapiAxiosInst.post(
                '/location-qna-result')
            console.log('Location Answer: ', response.data)
            return response.data
        } catch (error) {
            console.log('requestLocationAnswerToFastAPI() 중 문제 발생:', error)
            throw error
        }
    }
}

export default actions