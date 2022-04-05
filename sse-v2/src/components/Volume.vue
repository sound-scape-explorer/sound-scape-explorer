<template>
  <div>
    <input
      class="focus"
      ref="focus"
      @keydown.left="select(undefined, -1)"
      @keydown.right="select(undefined, +1)"
      @keydown.up="select(-1, undefined)"
      @keydown.down="select(1, undefined)"
    />
    <n-form inline>
      <div>
        <n-select v-model:value="currentRangeName" :options="rangeOptions" />
        <n-switch v-model:value="hourly"
                  title="Aggregate days">
          <template #checked>aggregate</template>
          <template #unchecked>date-based</template>
        </n-switch>
      </div>
      <n-select v-model:value="selectedSites" :options="siteOptions" multiple />
      <n-select v-model:value="what" :options="whatOptions" />
      <div>
        <input v-model.number="aggregate" />
        <n-select v-model:value="aggregate" :options="aggregateOptions" />
      </div>
    </n-form>
    <BoxPlotChart class="boxplot-container"
      v-if="boxPlotData"
      :chartData="boxPlotData"
      :options="{
        animation: false,
        scales: {
          x: {
            // Specific to Bar Controller, not taken into account?
            categoryPercentage: 0.9,
            barPercentage: 0.8,
          },
          y: {
            suggestedMin: 0,
            suggestedMax: 1.0,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Volume Box Plot',
          },
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

<script lang="js">
import { NTable, NForm, NSelect, NSwitch } from "naive-ui";
const NComponents = { NTable, NForm, NSelect, NSwitch };

import { defineChartComponent } from "vue-chart-3";
const BoxPlotChart = defineChartComponent("BoxPlotChart", "boxplot");

import { FILE_SITE } from "@/mappings";
import { argsort, dateFormatInTz, floorMod } from "@/utils";
import { useTask } from "vue-concurrency";
import { inject, computed, ref, unref, watch, nextTick } from "vue";

export default {
  inject: ["root"],
  components: { ...NComponents, BoxPlotChart },
  mounted() {
    this.currentBand = this.bands[0];
    this.currentIntegration = this.integrations[0];
    this.currentRangeName = this.ranges[0];
    this.selectedSites = this.sites[0] ? [this.sites[0]] : [];
    this.$refs.focus.focus();
    this.select();
  },
  setup() {
    const root = inject("root");
    const dateThere = d => dateFormatInTz(d, root.cfg.variables.display_locale);
    // data-like
    const o = {
      currentIntegration: ref(""),
      currentBand: ref(""),
      currentRangeName: ref(""),
      hourly: ref(false),
      selectedSites: ref([""]),
      what: ref("sumvar"),
      aggregate: ref(3600),
      focus: ref(null),
      forceUpdateBoxPlotData: ref(false), // used to force new chart creation as updating with a different number of dataset crashes
    };
    const toOptions = (r) =>
      computed(() => unref(r).map((s) => ({ label: s, value: s })));
    o.toOptions = toOptions;
    o.ranges = computed(() => Object.keys(root.cfg.ranges));
    o.rangeOptions = toOptions(o.ranges);
    o.sites = computed(() => [
      ...new Set(Object.values(root.cfg.files).map((f) => f[FILE_SITE])),
    ]);
    o.siteOptions = toOptions(o.sites);
    o.whatOptions = toOptions("sumvar sumstd logprodspan".split(" "));
    o.aggregateOptions = "1h:3600 30min:1800 15min:900 5min:300 as points:1 2h:7200"
      .split(" ")
      .map((kv) => kv.split(":"))
      .map(([k, v]) => ({
        label: k,
        value: parseInt(v),
      }));
    o.bands = computed(() => Object.keys(root.cfg.bands));
    o.integrations = computed(() =>
      root.cfg.variables.integration_seconds.split("-")
    );

    const fetcherCache = {};
    o.nr_fetcher = useTask(function* (signal, inte, band) {
      const k = inte + "/" + band;
      if (k in fetcherCache) return fetcherCache[k];
      const req = yield fetch(
        `${root.BASE}generated/single/volume/${inte}/${band}.json`,
        { signal }
      );
      const json = yield req.json();
      fetcherCache[k] = json;
      return json;
    });

    o.select = function (ki, k) {
      console.log(ki, k, o.bands, o.currentBand);
      if (k !== undefined) {
        if (typeof k === "number") {
          let ik = Math.min(
            Math.max(0, o.bands.value.indexOf(o.currentBand.value) + k),
            o.bands.value.length - 1
          );
          o.currentBand.value = o.bands.value[ik];
        } else {
          o.currentBand.value = k;
        }
      }
      if (ki !== undefined) {
        if (typeof ki === "number") {
          let iki = Math.min(
            Math.max(
              0,
              o.integrations.value.indexOf(o.currentIntegration.value) + ki
            ),
            o.integrations.value.length - 1
          );
          o.currentIntegration.value = o.integrations.value[iki];
        } else {
          o.currentIntegration.value = ki;
        }
      }
      o.nr_fetcher.perform(o.currentIntegration.value, o.currentBand.value);
      o.focus.value?.focus();
    };

    let lastCountSelectedSites = o.selectedSites.value.length;
    watch(o.selectedSites, () => {
      const l = o.selectedSites.value.length;
      if (l !== lastCountSelectedSites) {
        o.forceUpdateBoxPlotData.value = true;
        lastCountSelectedSites = l;
        nextTick(() => { o.forceUpdateBoxPlotData.value = false; });
      }
    });

    o.boxPlotData = computed(() => {
      if (o.forceUpdateBoxPlotData.value) {
        return null;
      }
      if (o.nr_fetcher.lastSuccessful === undefined) return null;
      const v = o.nr_fetcher.lastSuccessful.value;
      /*const sites = [
        ...new Set(Object.values(root.cfg.files).map((f) => f[FILE_SITE])),
      ];*/
      let selectedSites = o.selectedSites.value;
      if (selectedSites.length === 0) return null;
      ////// TODO vue chart need recreate if dataset count changes.......

      const res = {
        labels: [],
        datasets: [],
      };
      let minTime = Math.min(...selectedSites.map(s => o.currentRangeName.value + " " + s).map(k => Math.min(...v.data[k].t)));

      const agg = o.aggregate.value;
      let projectTime = t => minTime + agg * Math.floor((t - minTime) / agg);
      if (o.hourly.value) {
        projectTime = t => minTime + floorMod(agg * Math.floor((t - minTime) / agg), 3600*24);
      }

      let allTimes = [];
      for (let i in selectedSites) {
        const site = selectedSites[i];
        res.datasets.push({
          label: site,
          backgroundColor: `hsla(${(i * 360) / selectedSites.length},50%,50%,0.5)`, // TODO palette it
          borderColor: "black",
          borderWidth: 1,
          outlierBackgroundColor: "red",
          data: [],
        })

        const k = o.currentRangeName.value + " " + site;
        const times = v.data[k].t.map(projectTime);
        const inds = argsort(times, (a, b) => a - b);
        let currentTime = -Infinity;
        let currentData = [];
        const commit = (nextT) => {
          if (currentData.length > 0) {
            allTimes.push(currentTime);
          }
          currentTime = nextT;
          currentData = [];
        };
        for (const i of inds) {
          const t = times[i];
          if (t >= currentTime + agg) {
            commit(t);
          }
          currentData.push(1);
        }
        commit(+Infinity);
      }
      allTimes = [...new Set(allTimes)];
      allTimes.sort((a, b) => a - b); // default for sort would be ascii string order
      for (let t of allTimes) {
        res.labels.push(dateThere(new Date(1000 * t)));
        for (let site of selectedSites) {
          res.datasets[selectedSites.indexOf(site)].data.push([])
        }
      }
      for (let site of selectedSites) {
        const k = o.currentRangeName.value + " " + site;
        const times = v.data[k].t.map(projectTime);
        const series = v.data[k][o.what.value];
        const inds = argsort(times, (a, b) => a - b);
        let currentTime = -Infinity;
        let currentData = [];
        const commit = (nextT) => {
          if (currentData.length > 0) {
            res.datasets[selectedSites.indexOf(site)].data[allTimes.indexOf(currentTime)] = currentData;
          }
          currentTime = nextT;
          currentData = [];
        };
        for (const i of inds) {
          const t = times[i];
          if (t >= currentTime + agg) {
            commit(t);
          }
          currentData.push(series[i]);
        }
        commit(+Infinity);
      }
      return res;
    });

    return o;
  },
  computed: {
    currentGraphURL() {
      if (this.currentBand === "") return "";
      const B = this.root.BASE + this.root.cfg.variables.generated_base;
      const inte = parseInt(this.currentIntegration);
      return `${B}single/volume/${inte}/${this.currentBand}.${this.what}.png`;
    },
    boxPlotDataTest() {
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
  methods: {},
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
.boxplot-container {
  position: relative;
  overflow: hidden;
  resize: vertical;
  height: 50vh;
}
</style>
