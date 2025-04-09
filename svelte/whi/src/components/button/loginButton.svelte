<script lang="ts">
  import { loginState } from '../../store';

  function doLogin(name: string) {
    loginState.login(name);
  }
</script>

<style>
  .login-button {
  border: 1px solid #000000;
  background: #efefef;
  color: #000000;
  text-align: center;
  font-size: 14px;
  font-weight: Bold;
  font-family: Tahoma;
  padding: 2px 8px;
  margin: 3px 8px;
  cursor: pointer;
}
</style>

<button class="login-button" onclick={() => doLogin('Daniël')}>Login</button>