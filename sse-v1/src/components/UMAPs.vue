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
    <ScatterChart v-bind="scatterChartProps" />
    <n-input-group>
      <div style="width: 10%; margin: 0 2%">
        <n-space>
          <n-switch
            v-model:value="showAll"
            title="Show all (or select aggregation window size)"
          >
            <template #checked>all</template>
          </n-switch>
          <n-button-group size="small">
            <n-button @click="setDuration(600)">10min</n-button>
            <n-button @click="setDuration(3600)">1h</n-button>
          </n-button-group>
        </n-space>
        <n-input-number
          v-model:value="duration"
          title="Display ... seconds"
          :disabled="showAll"
        ></n-input-number>
      </div>
      <div style="width: 84%">
        <n-input-group>
          <n-slider
            :style="{ width: 80 / sliders.length + '%' }"
            v-for="s in sliders"
            :key="s.key"
            :disabled="showAll"
            v-model:value="start"
            title="Display starting at..."
            :format-tooltip="(v) => `${dateThere(new Date(1000 * v))}`"
            :min="s.startStop[0]"
            :max="s.startStop[1]"
            :step="startStep"
            :marks="s.marks"
          ></n-slider>
        </n-input-group>
        <n-button-group>
          <label
            >Showing {{ duration }} seconds, starting at
            {{ dateThere(new Date(1000 * start)) }}</label
          >
        </n-button-group>
      </div>
    </n-input-group>
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
import {
  NTable,
  NSlider,
  NInputNumber,
  NInputGroup,
  NButton,
  NButtonGroup,
  NSwitch,
} from "naive-ui";
const NComponents = {
  NTable,
  NSlider,
  NInputNumber,
  NInputGroup,
  NButton,
  NButtonGroup,
  NSwitch,
};

import { UMAP_RANGES } from "@/mappings.js";
import { onMounted, inject, computed, ref } from "vue";
import { ScatterChart, useScatterChart } from "vue-chart-3";
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

    const addAllGrey = ref(true);
    const showAll = ref(true);
    const duration = ref(3600); // sec
    const start = ref(parseInt(Date.now()/1000));// patch for incorect date, todo put the first date 

    const setDuration = (sec) => {
      showAll.value = false;
      duration.value = sec;
    };

    // TODO: perf: should probably avoid reactivity on the data? is it fetcher or vuechart?
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

    const startStep = computed(() => parseInt(duration.value / 2));
    const minStart = computed(() =>
      fetcher.lastSuccessful ? Math.min(...fetcher.lastSuccessful.value.t) : 0
    );
    const maxStart = computed(() =>
      fetcher.lastSuccessful
        ? minStart.value +
          startStep.value *
            parseInt(
              (Math.max(...fetcher.lastSuccessful.value.t) - minStart.value) /
                startStep.value
            )
        : 0
    );
    const sliders = computed(() => {
      if (root.cfg.umaps[currentUmap.value] === undefined) return [];
      return root.cfg.umaps[currentUmap.value][UMAP_RANGES].map((kr) => ({
        key: kr,
        startStop: root.cfg.ranges[kr].map((d) =>{
          console.log(parseInt(new Date(d).getTime() / 1000 /*+ 43200*/), d)
          return parseInt(new Date(d).getTime() / 1000 /*Fix problem with PM/AM*//*+43200*/) 
        }),
        marks: {
          [parseInt(new Date(root.cfg.ranges[kr][0]).getTime() / 1000 /*+43200*/)]: "⟦ ",
          [parseInt(
            new Date(root.cfg.ranges[kr][0]).getTime() / 1000 /*+43200*/+
              startStep.value *
                parseInt(
                  (new Date(root.cfg.ranges[kr][1]).getTime() -
                    new Date(root.cfg.ranges[kr][0]).getTime()) /
                    1000 /
                    startStep.value /
                    2
                )
          )]: kr,
          [parseInt(new Date(root.cfg.ranges[kr][1]).getTime() / 1000/*+43200*/)]: "⟧",
        },
      }));
    });
    function dateThere(d) {
      return new Intl.DateTimeFormat("fr", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: root.cfg.variables.display_locale,
      }).format(d);
    }

    const chartData = computed(() => {
      if (fetcher.lastSuccessful === undefined) return { datasets: [] };
      const v = fetcher.lastSuccessful.value;
      const labels = [...new Set(v.l)];
      const rawData = () => v.X.map(([x, y]) => ({ x, y }));
      let data;
      if (!showAll.value) {
        const tStart = start.value;
        const tEnd = tStart + duration.value;
        data = (l) =>
          rawData().filter(
            (o, i) => v.l[i] === l && v.t[i] >= tStart && v.t[i] < tEnd
          );
      } else {
        data = (l) => rawData().filter((o, i) => v.l[i] === l);
      }
      const datasets = labels.map((l, il) => ({
        label: l,
        data: data(l),
        backgroundColor: `hsl(${il / labels.length}turn, 75%, 50%, .5)`,
        // TODO: have a common hsl h-bending function that better distributes in terms of Δe00 for instance
      }));
      const allGreyDataset =
        addAllGrey.value && !showAll.value
          ? [
              {
                label: "*",
                data: v.X.map(([x, y]) => ({ x, y })),
                pointBackgroundColor: "hsl(0, 0%, 50%)",
                pointBorderWidth: 0,
                pointRadius: 2,
              },
            ]
          : [];

      return {
        datasets: [...datasets, ...allGreyDataset],
      };
    });
    const chartOptions = computed(() => {
      if (fetcher.lastSuccessful === undefined) return {};
      const v = fetcher.lastSuccessful.value;
      const xs = v.X.map((pair) => pair[0]);
      const ys = v.X.map((pair) => pair[1]);
      const scales = {
        x: {
          min: Math.min(...xs),
          max: Math.max(...xs),
        },
        y: {
          min: Math.min(...ys),
          max: Math.max(...ys),
        },
      };
      const addx = (scales.x.max - scales.x.min) / 20;
      const addy = (scales.y.max - scales.y.min) / 20;
      scales.x.min -= addx;
      scales.x.max += addx;
      scales.y.min -= addy;
      scales.y.max += addy;

      return {
        title: `UMAP [${currentUmap.value}] ${currentBand.value}, ${v.binSize}sec window`,
        animation: {
          duration: 0,
        },
        scales,
      };
    });

    const { scatterChartProps } = useScatterChart({
      chartData,
      options: chartOptions,
    });

    return {
      minStart,
      maxStart,
      startStep,
      sliders,
      start,
      duration,
      setDuration,
      showAll,
      scatterChartProps,
      currentBand,
      currentUmap,
      bands,
      umaps,
      focus,
      currentGraphURL,
      select,
      dateThere,
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
