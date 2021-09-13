<template>
  <div>
    <input
      class="focus"
      ref="focus"
      @keydown.left="
        currentBand = bands[Math.max(0, bands.indexOf(currentBand) - 1)]
      "
      @keydown.right="
        currentBand =
          bands[Math.min(bands.length - 1, bands.indexOf(currentBand) + 1)]
      "
      @keydown.up="
        currentUmap = umaps[Math.max(0, umaps.indexOf(currentUmap) - 1)]
      "
      @keydown.down="
        currentUmap =
          umaps[Math.min(umaps.length - 1, umaps.indexOf(currentUmap) + 1)]
      "
    />
    <n-table size="small">
      <tr>
        <th></th>
        <th v-for="k in bands" :key="k" @click="select(undefined, k)">
          {{ k }}
        </th>
      </tr>
      <tr v-for="ku in umaps" :key="ku">
        <th
          :title="'Duration to estimate the variance: ' + ku + ' sec'"
          @click="select(ku, undefined)"
        >
          {{ ku }}
        </th>
        <td
          v-for="k in bands"
          :key="k"
          @click="select(ku, k)"
          :class="{ current: currentBand === k && currentUmap === ku }"
        >
          o
        </td>
      </tr>
    </n-table>
    <img class="umap-graph" :src="currentGraphURL" />
  </div>
</template>

<script>
import { NTable } from "naive-ui";
const NComponents = { NTable };

export default {
  inject: ["root"],
  components: { ...NComponents },
  data: () => ({
    currentBand: "",
    currentUmap: "",
  }),
  mounted() {
    this.currentBand = this.bands[parseInt(this.bands.length / 2)];
    this.currentUmap = this.umaps[parseInt(this.umaps.length / 2)];
    this.$refs.focus.focus();
  },
  computed: {
    bands() {
      return Object.keys(this.root.cfg.bands);
    },
    umaps() {
      return Object.keys(this.root.cfg.umaps);
    },
    currentGraphURL() {
      if (this.currentBand === "") return "";
      const B = this.root.BASE + this.root.cfg.variables.generated_base;
      return B + `umap/${this.currentUmap}/${this.currentBand}.png`;
    },
  },
  methods: {
    select(ku, k) {
      if (k !== undefined) {
        this.currentBand = k;
      }
      if (ku !== undefined) {
        this.currentUmap = ku;
      }
      this.$refs.focus.focus();
    },
  },
};
</script>

<style>
.current {
  filter: invert(100%);
}
.volume-graph {
  width: 100%;
  pointer-events: none;
}
.focus {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
