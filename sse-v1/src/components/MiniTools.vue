<template>
  <div>
    <input type="button" @click="scan" value="Scan Files?">
    <input type="button" @click="importing" value="Import new Logger/Audio files?">
    <ScanData v-if="ScanDataView"></ScanData>
    <ImportData v-if="ImportDataView"></ImportData>
    <br />
    <label for="sampleRate">Sample rate</label>
    <input name="sampleRate" v-model.number="sampleRate" /><br>
    <label for="maxSampleRate">Max of sample rate (traduce in Hz below)</label>
    <input type="number" step="64" v-model.number="bandSize" /><br>
    <label for="minSampleRate">Min of sample rate (traduce in Hz below)</label>
    <input type="number" step="64" v-model.number="bandOffset" /><br>
    <label for="minSampleRate">Duration of preview</label>
    <input type="number" max="60" min="0" step="1" v-model.number="root.audioDuration" /><br>
    <label><input type="checkbox" v-model="inHz" /> hz</label>
    <input disabled :value="Math.round(bandInfo[0])" />
    <input disabled :value="Math.round(bandInfo[1])" />
    <br />
    <input type="button" @click="computeBands" value="compute">
    <br />
    <label><input type="checkbox" v-model="showTable" />show table of band.s</label>
    <table v-if="showTable" class="band-table">
      <tr>
        <th>band spec</th>
        <th>start -</th>
        <th>end (hz)</th>
        <th>start -</th>
        <th>end (mel)</th>
      </tr>
      <tr v-for="d in bandTableRows" :key="d[0]">
        <td v-for="(v, i) in d" :key="i">{{ i == 0 ? v : Math.round(v) }}</td>
      </tr>
    </table>
    <hr />
  </div>
</template>

<script>
import { getBandBoundsFromSpec } from "@/utils.js";
import ScanData from "./ScanData.vue";
import ImportData from "./ImportData.vue";
const OComponents = {ScanData,ImportData };

export default {
  inject: ["root"],
  components: { ...OComponents },
  data: () => ({
    sampleRate: 44100,
    bandSize: 64,
    bandOffset: 0,
    inHz: true,
    showTable: true,
    ScanDataView:false,
    ImportDataView:false,
  }),
  computed: {
    /**
     * Calculate the bands frequencies on this template view
     */
    bandTableRows() {
      const res = [];
      for (const size of [this.bandSize]) {
        let offset = 0;
        while (offset + 64 <= size) {
          const params = [[size, offset], this.sampleRate];
          res.push([
            `${size}-${offset}`,
            ...getBandBoundsFromSpec(...params, true),
            ...getBandBoundsFromSpec(...params, false),
          ]);
          offset += 64;
        }
      }
      return res;
    },
    bandInfo() {
      return getBandBoundsFromSpec(
        [this.bandSize, this.bandOffset],
        this.sampleRate,
        this.inHz
      );
    },
  },
  mounted() {
    this.sampleRate = parseInt(
      this.root.cfg.variables.audio_expected_sample_rate
    );
  },
  methods:{
    async computeBands(){
      console.log("calcul pour le sse extract");
      console.log(this.root.BASE+ "compute/" +this.root.curentPreviewFile+"/"+this.root.audioDuration)
      let req = await fetch(this.root.BASE+ "compute/" +this.root.curentPreviewFile+"/"+this.root.audioDuration)
      let res = req.json();
      console.log("calcul terminer ? "+ res)
    },
    scan(){
      this.ScanDataView=true;
    },
    importing(){
      this.ImportDataView=true;
    },
  },
};
</script>

<style lang="scss" scoped>
.band-table {
  td:nth-of-type(1) {
    font-weight: bold;
    text-align: center;
  }
  th:nth-of-type(2n) {
    text-align: right;
  }
  td:nth-of-type(2n) {
    padding-left: 2em;
    text-align: right;
    &::after {
      content: " -";
    }
  }
}
</style>