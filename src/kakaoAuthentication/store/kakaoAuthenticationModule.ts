import actions, { KakaoAuthenticationActions } from "./actions"
import mutations, { KakaoAuthenticationMutations } from "./mutations"
import state, { KakaoAuthenticationState } from "./states"

export interface KakaoAuthenticationModule {
    namespaced: true
    state: KakaoAuthenticationState
    actions: KakaoAuthenticationActions
    mutations: KakaoAuthenticationMutations
}

const kakaoAuthenticationModule: KakaoAuthenticationModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default kakaoAuthenticationModule

