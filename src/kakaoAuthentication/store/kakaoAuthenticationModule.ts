import actions, { KakaoAuthenticationActions } from "./actions"
import state, { AuthenticationState } from "@/authentication/store/states"


export interface KakaoAuthenticationModule {
    namespaced: true
    state: AuthenticationState
    actions: KakaoAuthenticationActions
}

const kakaoAuthenticationModule: KakaoAuthenticationModule = {
    namespaced: true,
    state,
    actions,
}

export default kakaoAuthenticationModule

