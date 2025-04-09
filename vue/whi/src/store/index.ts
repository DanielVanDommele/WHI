import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    // loginState : int
    // -----------
    // 0: not logged in
    // 1: logged in
    // -----------
    isLoggedIn: false,
    // loginName : string
    loginName: "",
  },
  getters: {},
  mutations: {
    login(state, name) {
      state.isLoggedIn = true;
      state.loginName = name;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.loginName = "";
    },
  },
  actions: {},
  modules: {},
});
