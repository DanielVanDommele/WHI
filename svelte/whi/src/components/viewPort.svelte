<script lang="ts">
  import LogoBar from "../components/logoBar.svelte";
  import MapPanel from "../components/mapPanel.svelte";
  import DetailPanel from "../components/detailPanel.svelte";
  import TimeBar from "../components/timeBar.svelte";
</script>

<style>
.view-port {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  width: 100%;
  height: 100%;
  margin: 0px;
}

.panels-row {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  flex: 1;
}
</style>

<div class="view-port">
    <LogoBar />
    <div class="panels-row">
        <MapPanel />
        <DetailPanel />
    </div>
    <TimeBar />
</div>