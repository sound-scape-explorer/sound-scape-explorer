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
        currentIntegration =
          integrations[
            Math.max(0, integrations.indexOf(currentIntegration) - 1)
          ]
      "
      @keydown.down="
        currentIntegration =
          integrations[
            Math.min(
              integrations.length - 1,
              integrations.indexOf(currentIntegration) + 1
            )
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
      <tr v-for="ki in integrations" :key="ki">
        <th
          :title="'Duration to estimate the variance: ' + ki + ' sec'"
          @click="select(ki, undefined)"
        >
          {{ ki }}
        </th>
        <td
          v-for="k in bands"
          :key="k"
          @click="select(ki, k)"
          :class="{ current: currentBand === k && currentIntegration === ki }"
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
    currentIntegration: "",
  }),
  mounted() {
    this.currentBand = this.bands[parseInt(this.bands.length / 2)];
    this.currentIntegration =
      this.integrations[parseInt(this.integrations.length / 2)];
    this.$refs.focus.focus();
  },
  computed: {
    bands() {
      return Object.keys(this.root.cfg.bands);
    },
    integrations() {
      return this.root.cfg.variables.integration_seconds.split("-");
    },
    currentGraphURL() {
      if (this.currentBand === "") return "";
      const B = this.root.BASE + this.root.cfg.variables.generated_base;
      return (
        B +
        `single/volume/${this.currentBand}_eachLogger${
          this.currentIntegration
        }_${(parseInt(this.currentIntegration) / 2).toFixed(0)}.png`
      );
    },
  },
  methods: {
    select(ki, k) {
      if (k !== undefined) {
        this.currentBand = k;
      }
      if (ki !== undefined) {
        this.currentIntegration = ki;
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
