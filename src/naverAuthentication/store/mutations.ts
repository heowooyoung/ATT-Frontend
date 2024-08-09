import { MutationTree } from "vuex";
import { NaverAuthenticationState} from "./states";
import { REQEUST_IS_AUTEHNTICATED_TO_DJANGO } from "./mutation-types";

export interface AuthenticationMutations extends MutationTree<NaverAuthenticationState>{
    [REQEUST_IS_AUTEHNTICATED_TO_DJANGO] (state: NaverAuthenticationState, settingValue: boolean): void
}

const mutations: MutationTree<NaverAuthenticationState> = {
    [REQEUST_IS_AUTEHNTICATED_TO_DJANGO] (state: NaverAuthenticationState, settingValue: boolean): void{
        state.isAuthenticated = settingValue
    }
}

export default mutations as AuthenticationMutations
