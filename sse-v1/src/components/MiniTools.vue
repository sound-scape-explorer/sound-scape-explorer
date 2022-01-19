<template>
  <div>
    <input v-model.number="sampleRate" />
    <input type="number" step="64" v-model.number="bandSize" />
    <input type="number" step="64" v-model.number="bandOffset" />
    <label><input type="checkbox" v-model="inHz" /> hz</label>
    <input disabled :value="Math.round(bandInfo[0])" />
    <input disabled :value="Math.round(bandInfo[1])" />
    <br />
    <input type="button" @click="computeBands" value="compute">
    <br />
    <label><input type="checkbox" v-model="showTable" /> table</label>
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

export default {
  inject: ["root"],

  data: () => ({
    sampleRate: 44100,
    bandSize: 64,
    bandOffset: 0,
    inHz: true,
    showTable: true,
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
    computeBands(){
      console.log("calcul pour le sse compute");
      //afficher le chargement
      
      console.log("calcul terminer")

    }
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