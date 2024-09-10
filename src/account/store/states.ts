export interface Account {
    nickname: string;
}

export interface User {
    id: number;
    email: string;
    nickname: string;
    name: string;
    gender: string;
    mbti: string;
    loginType: string;
}

export interface AccountState {
    isLoggedIn: boolean;
    account: Account | null;
    users: User[]; 
}

const state: AccountState = {
    isLoggedIn: false,
    account: null,
    users: [],  
};

export default state;