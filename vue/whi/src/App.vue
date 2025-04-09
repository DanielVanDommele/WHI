<template>
  <ViewPort />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ViewPort from "./components/viewPort.vue";

@Options({
  components: {
    ViewPort,
  },
})
export default class App extends Vue {}
</script>
