import actions, { AuthenticationActions } from "./actions"
import state, { AuthenticationState } from "@/authentication/store/states"

export interface NaverAuthenticationModule {
    namespaced: true
    state: AuthenticationState
    actions: AuthenticationActions
}

const naverAuthenticationModule: NaverAuthenticationModule = {
    namespaced: true,
    state,
    actions,
}

export default naverAuthenticationModule

