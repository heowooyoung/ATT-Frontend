import actions, { GoogleAuthenticationActions } from "./actions"
import state, { AuthenticationState } from "@/authentication/store/states"



export interface GoogleAuthenticationModule {
    namespaced: true
    state: AuthenticationState
    actions: GoogleAuthenticationActions
}

const googleAuthenticationModule: GoogleAuthenticationModule = {
    namespaced: true,
    state,
    actions,
}

export default googleAuthenticationModule