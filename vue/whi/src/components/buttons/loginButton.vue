<template>
  <div class="login-button" @click="() => doLogin('Daniël')">Login</div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  methods: {
    doLogin(name: string) {
      this.$store.commit("login", name);
    },
  },
})
export default class LoginButton extends Vue {}
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
