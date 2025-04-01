'use client';

import { createContext, Dispatch, SetStateAction } from "react";


interface LoginState {
    isLoggedIn: boolean;
    name: string;
}

interface LoginStateContextData {
  loginState: LoginState | undefined;
  setLoginState: Dispatch<SetStateAction<LoginState | null>>;
}

const LoginStateContext = createContext<LoginStateContextData | null>({
  loginState: undefined,
  setLoginState: () => undefined
});

export default LoginStateContext;
