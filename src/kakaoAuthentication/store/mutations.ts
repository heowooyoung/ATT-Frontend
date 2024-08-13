import { MutationTree } from "vuex";
import { KakaoAuthenticationState } from "./states";
import { REQUEST_IS_AUTHENTICATED_TO_DJANGO } from "./mutation-types";

export interface KakaoAuthenticationMutations extends MutationTree<KakaoAuthenticationState> {
    [REQUEST_IS_AUTHENTICATED_TO_DJANGO](state: KakaoAuthenticationState, settingValue: boolean): void
}

const mutations: MutationTree<KakaoAuthenticationState> = {
    [REQUEST_IS_AUTHENTICATED_TO_DJANGO](state: KakaoAuthenticationState, settingValue: boolean): void {
        state.isAuthenticated = settingValue
    }
}

export default mutations as KakaoAuthenticationMutations
