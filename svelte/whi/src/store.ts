import { writable } from 'svelte/store';

interface LoginState {
  name: string;
  isLoggedIn: boolean;
};

function change(state: LoginState, name: string, loggedIn: boolean): LoginState {
    state.name = name;
    state.isLoggedIn = loggedIn;
    return state;
}

function createLoggedInState() {
  const initialState: LoginState = {
    name: '',
    isLoggedIn: false
  };
   const { subscribe, set, update } = writable(initialState);   

   return {
      subscribe,
      login: (name: string) => update(s => change(s, name, true)),
      logout: () => update(s => change(s, '', false)),
      getIsLoggedIn: () => initialState.isLoggedIn,
      getLoginName: () => initialState.name
   };
}

export const loginState = createLoggedInState();