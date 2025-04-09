<template>
  <div class="logo-bar">
    <div class="logo-text">WHI? (Vue version)</div>
    <div class="login-info">{{ showLoginInformation }}</div>
    <div class="button-space">
      <LogoutButton v-if="isLoggedIn" />
      <div class="buttons-not-logged-in" v-else>
        <LoginButton />
        <SignupButton />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import SignupButton from "./buttons/signupButton.vue";
import LoginButton from "./buttons/loginButton.vue";
import LogoutButton from "./buttons/logoutButton.vue";

@Options({
  components: {
    SignupButton,
    LoginButton,
    LogoutButton,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    showLoginInformation() {
      if (this.$store.state.isLoggedIn) {
        return `logged in as ${this.$store.state.loginName}`;
      } else {
        return "You are not yet logged in";
      }
    },
  },
})
export default class LogoBar extends Vue {}
</script>

<style>
.logo-bar {
  align-items: stretch;
  display: flex;
  flex-flow: row nowrap;
  height: 30px;
  background: #09a2e4;
  vertical-align: middle;
  border-bottom: 2px solid #000000;
}

.logo-text {
  color: #ffffff;
  flex: 2;
  font-family: Tahoma;
  font-size: 22px;
  font-style: italic;
  font-weight: Bold;
  padding-left: 5px;
}

.login-info {
  flex: 1;
  color: #000000;
  font-family: Tahoma;
  font-size: 14px;
  padding-top: 5px;
  padding-right: 5px;
  text-align: right;
}

.buttons-not-logged-in {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}
</style>
