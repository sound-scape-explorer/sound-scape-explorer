<template>
  <div v-if="cfg.variables">
    <n-tabs type="card" default-value="preview">
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
      <n-tab-pane name="volume" tab="Volumes">
        <MockVolume></MockVolume>
      </n-tab-pane>
      <n-tab-pane name="covering" tab="Covering">
        <MockCovering></MockCovering>
      </n-tab-pane>
      <n-tab-pane name="umaps" tab="UMAP">
        <UMAPs></UMAPs>
      </n-tab-pane>
      <n-tab-pane name="cfg" tab="Raw Config">
        <pre>{{ JSON.stringify(cfg, null, 2) }}</pre>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script>
import Preview from "./components/Preview.vue";
import MockVolume from "./components/MockVolume.vue";
import MockCovering from "./components/MockCovering.vue";
import UMAPs from "./components/UMAPs.vue";
const OComponents = { Preview, MockVolume, MockCovering, UMAPs };

import { NTabs, NCard, NTabPane } from "naive-ui";
const NComponents = { NTabs, NCard, NTabPane };

export default {
  name: "App",
  components: { ...OComponents, ...NComponents },
  data: () => ({
    BASE: "http://localhost:9876/",
    LOCAL: false,
    cfg: {},
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
