import { MutationTree } from "vuex";
import { AICommandState } from "./states";
import { 
    REQUEST_AI_COMMAND_RESULT_TO_FASTAPI,
} from "./mutation-types";

export interface AICommandMutations extends MutationTree<AICommandState> {
    // ai 결과가 어찌될지 모르니 receivedData는 any로 어떤 것이든 올 수 있다로 설정
    [REQUEST_AI_COMMAND_RESULT_TO_FASTAPI] (state: AICommandState, receivedData: any): void
}

const mutations: MutationTree<AICommandState> = {
    [REQUEST_AI_COMMAND_RESULT_TO_FASTAPI] (state: AICommandState, receivedData: any): void {
        state.aiCommandResult = receivedData
    },
}

export default mutations as AICommandMutations