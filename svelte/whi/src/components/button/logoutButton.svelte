<script lang="ts">
  import { loginState } from '../../store';

  function doLogout() {
    loginState.logout();
  }
</script>

<style>
  .logout-button {
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

<button class="logout-button" onclick={doLogout}>Logout</button>