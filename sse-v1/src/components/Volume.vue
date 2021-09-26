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
    <input v-model="what" />
    <BoxPlotChart
      :chartData="boxPlotData"
      :options="{
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Box Plot Chart',
        },
        scales: {
          xAxes: [
            {
              // Specific to Bar Controller
              categoryPercentage: 0.9,
              barPercentage: 0.8,
            },
          ],
        },
      }"
    ></BoxPlotChart>
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

import { defineChartComponent } from "vue-chart-3";
const BoxPlotChart = defineChartComponent("BoxPlotChart", "boxplot");

export default {
  inject: ["root"],
  components: { ...NComponents, BoxPlotChart },
  data: () => ({
    currentBand: "",
    currentIntegration: "",
    what: "sumvar",
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
      const inte = parseInt(this.currentIntegration);
      return `${B}single/volume/${inte}/${this.currentBand}.${this.what}.png`;
    },
    boxPlotData() {
      const res = {
        labels:
          "1 2 3 4 5 6 very-long-stuff-of-the-dead-too-long-for-sure".split(
            " "
          ),
        datasets: [],
      };
      const datasets = "ds1 ds2 ds3 ds4".split(" ");
      for (const li in datasets) {
        res.datasets.push({
          label: datasets[li],
          backgroundColor: `hsla(${(li * 360) / datasets.length},50%,50%,0.5)`,
          borderColor: "black",
          borderWidth: 1,
          outlierBackgroundColor: "red",
          data: [
            Array.from(Array(1000), Math.random),
            Array.from(Array(100), Math.random),
            Array.from(Array(10), Math.random),
            Array.from(Array(50), Math.random),
            Array.from(Array(10), Math.random),
            Array.from(Array(100), Math.random),
            Array.from(Array(1000), Math.random),
          ],
        });
      }
      // TODO: consider generating index in addition d_times
      return res;
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
