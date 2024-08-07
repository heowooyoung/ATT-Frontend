import actions, { AuthenticationActions } from "./actions"
import mutations, { AuthenticationMutations } from "./mutations"
import state, { AuthenticationState } from "./states"

export interface AuthenticationModule {
    namespaced: true
    state: AuthenticationState
    actions: AuthenticationActions
    mutations: AuthenticationMutations
}

const kakaoAuthenticationModule: AuthenticationModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default kakaoAuthenticationModule

