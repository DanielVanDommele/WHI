<template>
  <div class="logout-button" @click="doLogout">Logout</div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  methods: {
    doLogout() {
      this.$store.commit("logout");
    },
  },
})
export default class LoginButton extends Vue {}
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
  margin: 3px 2px;
  cursor: pointer;
}
</style>
