<script lang="ts">
  import { loginState } from '../../store';

  function doSignup() {
  }
</script>

<style>
  .signup-button {
  border: 1px solid #000000;
  background: #efefef;
  color: #000000;
  text-align: center;
  font-size: 14px;
  font-weight: Bold;
  font-family: Tahoma;
  padding: 2px 8px;
  margin: 3px 2px;
  cursor: pointer;
}
</style>

<button class="signup-button" onclick={() => doSignup()}>Sign up</button>