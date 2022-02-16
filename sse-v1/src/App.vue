<template>
  <div>
    <div id="startApp" v-if="atBegin">
      <span class="iconify" data-icon="eos-icons:loading"></span>
      <p>loading</p>
    </div> 
    <div v-if="startPannel">
      <table id="tableApp">
        <tbody>
          <tr @click="importDataAndExtract">
            <td><span class="iconify" data-icon="carbon:document-import"></span></td>
            <td>Importer les fichier audio</td>
          </tr>
          <tr @click="scanDataAndExtract">
            <td><span class="iconify" data-icon="carbon:scan"></span></td>
            <td>Scan des fichier a partir de /sample/audio</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ScanData v-if="ScanDataView"></ScanData>
    <ImportData v-if="ImportDataView"></ImportData>
    <div v-if="cfg.variables && !startPannel">
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
        <n-tab-pane name="player" tab="Player">
          <Player></Player>
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
  </div>
</template>

<script>
import Preview from "./components/Preview.vue";
import Player from "./components/Player.vue";
import ScanData from "./components/ScanData.vue";
import ImportData from "./components/ImportData.vue";
import Volume from "./components/Volume.vue";
import MockCovering from "./components/MockCovering.vue";
import UMAPs from "./components/UMAPs.vue";
import MiniTools from "./components/MiniTools.vue";
const OComponents = { Preview, Player,ScanData,ImportData, Volume, MockCovering, UMAPs, MiniTools };

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
    startPannel: false,
    atBegin:true,
    ImportDataView:false,
    ScanDataView:false,
    regex:"",
    groupe:0,
  }),
  provide() {
    return {
      root: this,
    };
  },
  mounted() {
    this.asyncLoadConfig();
    let externalScript = document.createElement('script')
    externalScript.setAttribute('src', 'https://code.iconify.design/2/2.1.2/iconify.min.js')
    document.head.appendChild(externalScript)
  },
  methods: {
    async asyncLoadConfig() {
      if (window.JSONJS !== undefined) {
        this.cfg = window.JSONJS;
        console.log(this.cfg);
      } else {
        try {
          const req = await fetch(this.BASE + "generated/ghost-config.json");
          this.cfg = await req.json();
          this.curentPreviewFile = this.cfg.variables.preview_file;
          this.atBegin=false
        } catch (error) {
          this.startPannel=true
          this.atBegin=false
          //afficher a l'utilisateur le scan des fichiers
        }
      }
    },
    async importDataAndExtract(){
      this.ImportDataView=true
      this.ScanDataView=false
    },
    async scanDataAndExtract(){
      this.ImportDataView=false
      this.ScanDataView=true
    },
    request: async function (path) {
      let res = await fetch(path);
      let body = await res.json();
      return body;
    },
    requestPost: async function(path, jsonObject){
      let res = fetch(path, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(jsonObject),
                })
      let body = await res.json();
      return body;
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

#tableApp tr{
  background-color: #333;
}

#tableApp,#tableApp th,#tableApp td {
  border: 1px solid black;
  border-collapse: collapse;
}
#tableApp td{
  border-right: 0px;
  border-left: 0px;
  color:orange
}
</style>
