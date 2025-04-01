<template>
  <div class="view-port">
    <LogoBar />
    <div class="panels-row">
      <MapPanel />
      <DetailPanel />
    </div>
    <TimeBar />
  </div>
</template>

<style>
.view-port {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  width: 100%;
  height: 100%;
}

.panels-row {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  flex: 1;
}
</style>

<script lang="ts">
import LogoBar from "./logoBar.vue";
import TimeBar from "./timeBar.vue";
import MapPanel from "./mapPanel.vue";
import DetailPanel from "./detailPanel.vue";

export default {
  components: {
    LogoBar,
    TimeBar,
    MapPanel,
    DetailPanel,
  },
};
</script>
