<template>
  <div class="detail-panel">
    <SelectionDetails v-if="isLoggedIn" />
    <Explanation v-else />
  </div>
</template>

<style>
.detail-panel {
  width: 300px;
  border-left: 2px solid #000000;
  font-family: Tahoma;
  text-align: center;
  padding-top: 12px;
}
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Explanation from "./details/explanation.vue";
import SelectionDetails from "./details/selectionDetails.vue";

@Options({
  components: {
    Explanation,
    SelectionDetails,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
})
export default class DetailPanel extends Vue {}
</script>
