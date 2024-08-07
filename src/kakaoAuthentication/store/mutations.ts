import { MutationTree } from "vuex";
import { AuthenticationState} from "./states";
import { REQEUST_IS_AUTEHNTICATED_TO_DJANGO } from "./mutation-types";

export interface AuthenticationMutations extends MutationTree<AuthenticationState>{
    [REQEUST_IS_AUTEHNTICATED_TO_DJANGO] (state: AuthenticationState, settingValue: boolean): void
}

const mutations: MutationTree<AuthenticationState> = {
    [REQEUST_IS_AUTEHNTICATED_TO_DJANGO] (state: AuthenticationState, settingValue: boolean): void{
        state.isAuthenticated = settingValue
    }
}

export default mutations as AuthenticationMutations
