<script lang="ts">
  import { loginState } from '../store';

  import LoginButton from './button/loginButton.svelte';
  import LogoutButton from './button/logoutButton.svelte';

  function isLoggedIn() {
    return $loginState.isLoggedIn;
  }

  function showLoginInformation() {
    if ($loginState.isLoggedIn) {
      return `logged in as ${$loginState.name}`;
    } else {
      return "You are not yet logged in";
    }
  }
</script>

<style>
.logo-bar {
  align-items: stretch;
  display: flex;
  flex-flow: row nowrap;
  height: 34px;
  background: #09a2e4;
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
</style>

<div class="logo-bar">
  <div class="logo-text">WHI? (Svelte version)</div>
  <div class="login-info">{showLoginInformation() }</div>
  <div class="button-space">
    {#if isLoggedIn()}
      <LogoutButton />
    {:else}
      <LoginButton />
    {/if}
  </div>
</div>