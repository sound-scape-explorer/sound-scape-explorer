<template>
  <div v-if="cfg.variables">
    <n-tabs type="card" default-value="volume">
      <template #prefix>
        <img
          class="logo"
          alt="SoundScapeExplorer logo"
          src="./assets/logo.png"
        />
      </template>
      <n-tab-pane name="preview" tab="Preview">
        <Preview></Preview>
      </n-tab-pane>
      <n-tab-pane name="umap" tab="UMAP">
        <UMAPs></UMAPs>
      </n-tab-pane>
      <n-tab-pane name="volume" tab="Volumes">
        <Volume></Volume>
      </n-tab-pane>
      <n-tab-pane name="covering" tab="Covering">
        <MockCovering></MockCovering>
      </n-tab-pane>
      <n-tab-pane name="minitools" tab="MiniTools">
        <MiniTools></MiniTools>
      </n-tab-pane>
      <n-tab-pane name="cfg" tab="Raw Config">
        <pre>{{ JSON.stringify(cfg, null, 2) }}</pre>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script>
import Preview from "./components/Preview.vue";
import Volume from "./components/Volume.vue";
import MockCovering from "./components/MockCovering.vue";
import UMAPs from "./components/UMAPs.vue";
import MiniTools from "./components/MiniTools.vue";
const OComponents = { Preview, Volume, MockCovering, UMAPs, MiniTools };

import { NTabs, NCard, NTabPane } from "naive-ui";
const NComponents = { NTabs, NCard, NTabPane };

export default {
  name: "App",
  components: { ...OComponents, ...NComponents },
  data: () => ({
    BASE: "http://localhost:9876/",
    LOCAL: false,
    cfg: {},
    curentPreviewFile: "",
    audioDuration: 60,
  }),
  provide() {
    return {
      root: this,
    };
  },
  mounted() {
    this.asyncLoadConfig();
  },
  methods: {
    async asyncLoadConfig() {
      if (window.JSONJS !== undefined) {
        this.cfg = window.JSONJS;
        console.log(this.cfg);
      } else {
        const req = await fetch(this.BASE + "generated/ghost-config.json");
        this.cfg = await req.json();
        this.curentPreviewFile = this.cfg.variables.preview_file;
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  --logooff: 65;
  margin-top: calc(var(--logooff) * 1px);
}
.logo {
  /*
  position: absolute;
  */
  text-align: top;
  width: 100px;
  margin-top: calc(var(--logooff) * -1px);
}
</style>
