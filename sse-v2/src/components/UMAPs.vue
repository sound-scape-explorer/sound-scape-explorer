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
    <span @click="goFS($event.target)">FS</span>
    <div ref="scatterglDiv" class="scattergl-container" v-resize="onDivResize">
    </div>
    <div class="scattergl-controls">
      <input v-model="query"/>
      <input v-model="colorBy"/>
    </div>
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
            {{ dateThere(new Date(1000 * start)) }}
            {{ dateThere(new Date()) }}</label
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

<script setup lang="ts">
import {
  NTable,
  NSlider,
  NInputNumber,
  NInputGroup,
  NButton,
  NButtonGroup,
  NSwitch,
  NSpace,
} from "naive-ui";
/*
import { ScatterChart, useScatterChart } from "vue-chart-3";
*/

import { Dataset, RenderMode, ScatterGL } from '@/scatter-gl-src';
//import * as THREE from 'three';

import { UMAP_RANGES } from "@/mappings";
import { onMounted, inject, computed, ref, watchEffect, watch } from "vue";
import type { Ref } from "vue";
import { useTask } from "vue-concurrency";

const showOld = ref(false); // also show slow umap that uses chartjs?

const root : any = inject("root");
const focus : Ref<any> = ref(null);
const currentBand = ref("");
const currentUmap = ref("");

const bands = computed(() => Object.keys(root.cfg.bands));
const umaps = computed(() => Object.keys(root.cfg.umaps));

const currentGraphURL = computed(() => {
  if (currentBand.value === "") return "";
  const B = root.BASE + root.cfg.variables.generated_base;
  return B + `umap/${currentUmap.value}/${currentBand.value}.png`;
});

function select(ku: any, k: any) {
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
  focus.value?.focus();
}

onMounted(() => {
  select(
    umaps.value[Math.floor(umaps.value.length-1)],
    bands.value[Math.floor(bands.value.length-1)]
  );
});

const addAllGrey = ref(true);
const showAll = ref(true);
const duration = ref(3600); // sec
const start = ref(Math.floor(Date.now() / 1000)); // do not patch here the date by timezone, directly on display

const setDuration = (sec: number) => {
  showAll.value = false;
  duration.value = sec;
};

// TODO: perf: should probably avoid reactivity on the data? is it fetcher or vuechart?
const fetcherCache : {[k:string]: any} = {};
const fetcher = useTask(function* (signal, umap, band) {
  const k = umap + "/" + band;
  console.log(k, fetcherCache);
  if (k in fetcherCache) {
    return fetcherCache[k];
  }
  const req = yield fetch(`${root.BASE}generated/umap/${umap}/${band}.json`, {
    signal,
  });
  const json = yield req.json();
  fetcherCache[k] = json;
  return json;
});

const startStep = computed(() => Math.floor(duration.value / 2));
const minStart = computed(() =>
  fetcher.lastSuccessful ? Math.min(...fetcher.lastSuccessful.value.t) : 0
);
const maxStart = computed(() =>
  fetcher.lastSuccessful
    ? minStart.value +
      startStep.value *
        Math.floor(
          (Math.max(...fetcher.lastSuccessful.value.t) - minStart.value) /
            startStep.value
        )
    : 0
);
const sliders = computed(() => {
  if (root.cfg.umaps[currentUmap.value] === undefined) return [];
  return root.cfg.umaps[currentUmap.value][UMAP_RANGES].map((kr:string) => ({
    key: kr,
    startStop: root.cfg.ranges[kr].map((d:number) => {
      console.log(Math.floor(new Date(d).getTime() / 1000), d);
      return Math.floor(new Date(d).getTime() / 1000);
    }),
    marks: {
      [Math.floor(new Date(root.cfg.ranges[kr][0]).getTime() / 1000)]: "⟦ ",
      [Math.floor(
        new Date(root.cfg.ranges[kr][0]).getTime() / 1000 +
          startStep.value *
            Math.floor(
              (new Date(root.cfg.ranges[kr][1]).getTime() -
                new Date(root.cfg.ranges[kr][0]).getTime()) /
                1000 /
                startStep.value /
                2
            )
      )]: kr,
      [Math.floor(new Date(root.cfg.ranges[kr][1]).getTime() / 1000)]: "⟧",
    },
  }));
});
function dateThere(d: Date) {
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

const testCol = ref(6);


const scatterglDiv = ref(null);
const query = ref("");
const colorBy = ref("labelIndex");

let scatterGL: ScatterGL | null = null;
let renderPass = 'normal';
let dataset: Dataset | null = null;
let lastSelectedPoints: number[] = [];
function rerender() {
  if (scatterGL === null) return;
  if (dataset === null) return;
  scatterGL.render(dataset);
}

function onDivResize() {
  scatterGL?.resize();
}
function goFS(button: any) {
  if (button && button.nextElementSibling) {
    button.nextElementSibling.requestFullscreen().then(()=> scatterGL?.resize())
  }
}

watch([fetcher], () => {
  if (fetcher.lastSuccessful === undefined) return null; // TODO null is ok but when nb of datasets changes there is a crash
  const v = fetcher.lastSuccessful.value;
  const labels = [...new Set(v.l)];
  //const rawData = () => v.X.map(([x, y]) => ({ x, y }));
  dataset = new Dataset(
    [...v.X, ...v.X],
    [...v.l.map((label: string) => ({label, labelIndex: labels.indexOf(label)})), ...v.l.map((label: string) => ({label, labelIndex: labels.indexOf(label)}))],
    );
  console.log("WATCH SCATTER", v.l.length);

  const darkMode = false;

  const first = scatterGL === null;
  if (first && scatterglDiv.value) {
    scatterGL = new ScatterGL(scatterglDiv.value, {
      onClick: (point: number | null) => {
        //setMessage(`click ${point}`);
      },
      onHover: (point: number | null) => {
        //setMessage(`hover ${point}`);
      },
      onSelect: (points: number[]) => {
        let message = '';
        if (points.length === 0 && lastSelectedPoints.length === 0) {
          message = 'no selection';
        } else if (points.length === 0 && lastSelectedPoints.length > 0) {
          message = 'deselected';
        } else if (points.length === 1) {
          message = `selected ${points}`;
        } else {
          message = `selected ${points.length} points`;
        }
        //setMessage(message);
      },
      renderMode: RenderMode.POINT,
      orbitControls: {
        zoomSpeed: 1.33,
      },
      styles: {
          backgroundColor: darkMode ? 0 : undefined,
          moreShaderOptions: {
              depthTest: false,
              depthWrite: false,
              /*blending: THREE.CustomBlending,
              blendEquation: darkMode ? THREE.AddEquation : THREE.AddEquation,
              blendDst: darkMode ? THREE.OneMinusSrcAlphaFactor : THREE.OneMinusSrcAlphaFactor,
              blendSrc: darkMode ? THREE.SrcAlphaFactor : THREE.SrcAlphaFactor,
              //*/
          },
      },
    });
  }
  rerender();
  if (first && scatterGL) {
    scatterGL.setPointColorer((ii/*, selectedIndices, hoverIndex*/) => {
      if (dataset === null) {
        return "red";
      }
      const i = ii % Math.floor(dataset.metadata.length / 2);
      const isBg = ii < dataset.metadata.length / 2;

      if (isBg) return `hsla(0, 0%, ${darkMode ? 20 : 90}%, 1)`;

      const colorV: number = dataset ? dataset.metadata[ii].labelIndex as number : 0
      const hue255 = ((colorV / testCol.value) % 1)* 255
      //const alpha = selectedIndices.size === 0 ? .1 : selectedIndices.has(i) ? 0.5 : 0.05
      const highAlpha = 0.75;
      const lowAlpha = 0.0;
      let alpha = 0.4;
      let sat = 100;

      if (showAll.value && query.value === "") {
        // show all
      } else {
        if (! showAll.value) { // time filter
          const tStart = start.value;
          const tEnd = tStart + duration.value;
          if (v.t[i] >= tStart && v.t[i] < tEnd) {
            alpha = highAlpha;
          } else {
            alpha = lowAlpha;
            sat = 0;
          }
        }
        if (query.value !== "") {
          alpha = queryPointIsIn.value(ii/*, selectedIndices, hoverIndex*/) ? Math.min(alpha, highAlpha) : lowAlpha;
        }
      }
      //alpha = i > dataset.metadata.length/3 ? highAlpha : lowAlpha;
      //return alpha === lowAlpha ? 'rgba(0,0,0,0)' : 'red'
      return `hsla(${Math.round(hue255)}, ${sat}%, 50%, ${alpha})`;
    }) // TODO: have a common hsl h-bending function that better distributes in terms of Δe00 for instance
  }
});
watch([query, showAll, start, duration, testCol], () => {
  rerender();
})
const queryPointIsIn = computed(() => {
  if (query.value === "") {
    return () => false;
  }
  return (ii:number) => dataset && dataset.metadata[ii].label?.indexOf(query.value) !== -1;
})
</script>

<style>
.current {
  filter: invert(100%);
}
.focus {
  width: 0;
  height: 0;
  opacity: 0;
}

.scattergl-container {
  position: relative;
  overflow: hidden;
  resize: vertical;
  height: 50vh;
  /*
  border: 5px solid blue;
  box-sizing: border-box;
  background: red;
  padding: 10px;
  margin: 20px;
  */
}
</style>
