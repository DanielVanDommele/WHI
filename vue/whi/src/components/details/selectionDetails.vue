<template>
  <div class="selection-details">
    <div class="cap-line">what is selected?</div>
    <br />
  </div>
</template>

<style>
.selection-details {
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
}

.cap-line {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}
</style>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class SelectionDetails extends Vue {}
</script>
