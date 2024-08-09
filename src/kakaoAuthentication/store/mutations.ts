import { MutationTree } from "vuex";
import { KakaoAuthenticationState} from "./states";
import { REQEUST_IS_AUTEHNTICATED_TO_DJANGO } from "./mutation-types";

export interface KakaoAuthenticationMutations extends MutationTree<KakaoAuthenticationState>{
    [REQEUST_IS_AUTEHNTICATED_TO_DJANGO] (state: KakaoAuthenticationState, settingValue: boolean): void
}

const mutations: MutationTree<KakaoAuthenticationState> = {
    [REQEUST_IS_AUTEHNTICATED_TO_DJANGO] (state: KakaoAuthenticationState, settingValue: boolean): void{
        state.isAuthenticated = settingValue
    }
}

export default mutations as KakaoAuthenticationMutations
