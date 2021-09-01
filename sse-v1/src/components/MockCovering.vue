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
        currentRadius =
          radiuses[Math.max(0, radiuses.indexOf(currentRadius) - 1)]
      "
      @keydown.down="
        currentRadius =
          radiuses[
            Math.min(radiuses.length - 1, radiuses.indexOf(currentRadius) + 1)
          ]
      "
    />
    <n-table size="small">
      <tr>
        <th></th>
        <th v-for="k in bands" :key="k" @click="select(undefined, k)">
          {{ k }}
        </th>
      </tr>
      <tr v-for="kr in radiuses" :key="kr">
        <th
          :title="
            'Radius to estimate the overlap: ' + kr[0] + '.' + kr.substr(1)
          "
          @click="select(kr, undefined)"
        >
          {{ kr }}
        </th>
        <td
          v-for="k in bands"
          :key="k"
          @click="select(kr, k)"
          :class="{ current: currentBand === k && currentRadius === kr }"
        >
          o
        </td>
      </tr>
    </n-table>
    <img class="volume-graph" :src="currentGraphURL" />
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
    currentRadius: "",
  }),
  mounted() {
    this.currentBand = this.bands[parseInt(this.bands.length / 2)];
    this.currentRadius = this.radiuses[parseInt(this.radiuses.length / 2)];
    this.$refs.focus.focus();
  },
  computed: {
    bands() {
      return Object.keys(this.root.cfg.bands);
    },
    radiuses() {
      return this.root.cfg.variables.nearest_radiuses.split("-");
    },
    currentGraphURL() {
      if (this.currentBand === "") return "";
      const B = this.root.BASE + this.root.cfg.variables.generated_base;
      return (
        B +
        `pairs/covering/${this.currentBand}_graph_r${this.currentRadius}.png`
      );
    },
  },
  methods: {
    select(ki, k) {
      if (k !== undefined) {
        this.currentBand = k;
      }
      if (ki !== undefined) {
        this.currentRadius = ki;
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
