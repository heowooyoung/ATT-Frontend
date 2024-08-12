import { ActionContext } from "vuex"
import { AICommandState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import {REQUEST_AI_COMMAND_RESULT_TO_FASTAPI} from "./mutation-types"

export type AICommandActions = {
    requestAICommandToFastAPI(context: ActionContext<AICommandState, any>, aiCommandNumber: number): Promise<void>,
    requestProcessedAICommandResultToFastAPI(context: ActionContext<AICommandState, any>): Promise<void>,
}

const actions: AICommandActions = {
    async requestAICommandToFastAPI(context: ActionContext<AICommandState, any>, aiCommandNumber: number): Promise<void>
        {
            try {
                const res = await axiosInst.fastapiAxiosInst.post('/request-ai-command', {
                    command: aiCommandNumber // postman에서 입력을 command : "" 로 했으므로 여기도 맞춰줘야함!
                })
                console.log('data :', res.data)
            } catch (error) {
                console.error('Error fetching read review :', error)
                throw error
            }
    },
    async requestProcessedAICommandResultToFastAPI(context: ActionContext<AICommandState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.fastapiAxiosInst.post('/dice-result');
            // 여긴 dice결과지만 나중에 서비스할때는 딥러닝 추론 결과이므로 저장해야함 -> context.commit 하기
            console.log('data:', res.data)
            const data = res.data
            context.commit('REQUEST_AI_COMMAND_RESULT_TO_FASTAPI', data)
        } catch (error) {
            console.error('Error fetching review list:', error);
            throw error
        }
    },

};
export default actions;