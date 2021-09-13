<template>
  <div>
    <input
      class="focus"
      ref="focus"
      @keydown.left="select(undefined, -1)"
      @keydown.right="select(undefined, 1)"
      @keydown.up="select(-1, undefined)"
      @keydown.down="select(1, undefined)"
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
    <ScatterChart v-bind="scatterChartProps" />
    <img class="umap-graph" :src="currentGraphURL" />
  </div>
</template>

<script>
import { onMounted, inject, computed, ref } from "vue";

import { NTable } from "naive-ui";
const NComponents = { NTable };

import { ScatterChart, useScatterChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import { useTask } from "vue-concurrency";

export default {
  components: { ...NComponents, ScatterChart },
  setup() {
    const root = inject("root");
    const focus = ref(null);
    const currentBand = ref("");
    const currentUmap = ref("");

    const bands = computed(() => Object.keys(root.cfg.bands));
    const umaps = computed(() => Object.keys(root.cfg.umaps));

    const currentGraphURL = computed(() => {
      if (currentBand.value === "") return "";
      const B = root.BASE + root.cfg.variables.generated_base;
      return B + `umap/${currentUmap.value}/${currentBand.value}.png`;
    });

    function select(ku, k) {
      if (k !== undefined) {
        if (typeof k === "number") {
          let ik = Math.min(
            Math.max(0, bands.value.indexOf(currentBand.value) + k),
            bands.value.length - 1
          );
          currentBand.value = bands.value[ik];
        } else {
          currentBand.value = k;
        }
      }
      if (ku !== undefined) {
        if (typeof ku === "number") {
          let iku = Math.min(
            Math.max(0, umaps.value.indexOf(currentUmap.value) + ku),
            umaps.value.length - 1
          );
          currentUmap.value = umaps.value[iku];
        } else {
          currentUmap.value = ku;
        }
      }
      fetcher.perform(currentUmap.value, currentBand.value);
      focus.value.focus();
    }

    onMounted(() => {
      select(
        umaps.value[parseInt(umaps.value.length / 2)],
        bands.value[parseInt(bands.value.length / 2)]
      );
    });

    const fetcherCache = {};
    const fetcher = useTask(function* (signal, umap, band) {
      const k = umap + "/" + band;
      console.log(k, fetcherCache);
      if (k in fetcherCache) return fetcherCache[k];
      const req = yield fetch(
        `${root.BASE}generated/umap/${umap}/${band}.json`,
        { signal }
      );
      const json = yield req.json();
      fetcherCache[k] = json;
      return json;
    });

    const chartData = computed(() => {
      if (fetcher.lastSuccessful === undefined) return { datasets: [] };
      let v = fetcher.lastSuccessful.value;
      let labels = [...new Set(v.l)];
      let datasets = labels.map((l, il) => ({
        label: l,
        data: v.X.map(([x, y]) => ({ x, y })).filter((o, i) => v.l[i] === l),
        backgroundColor: `hsl(${il / labels.length}turn, 100%, 50%, 0.33)`,
      }));
      return { datasets };
    });
    const chartOptions = computed(() => {
      if (fetcher.lastSuccessful === undefined) return {};
      let v = fetcher.lastSuccessful.value;
      return {
        title: `UMAP [${currentUmap.value}] ${currentBand.value}, ${v.binSize}sec window`,
        animation: {
          duration: 0,
        },
      };
    });

    const { scatterChartProps } = useScatterChart({
      chartData,
      options: chartOptions,
    });

    return {
      scatterChartProps,
      currentBand,
      currentUmap,
      bands,
      umaps,
      focus,
      currentGraphURL,
      select,
    };
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
