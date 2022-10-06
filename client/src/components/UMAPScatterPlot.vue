<script lang="ts" setup>
import {ref, watch} from 'vue';
import {NCheckbox, NP, NSlider} from 'naive-ui';
import {Chart} from 'highcharts-vue';
import {SERVER_HOSTNAME} from '../constants';
import {volumesStore} from '../store/volumes.store';
import accessibility from 'highcharts/modules/accessibility';
import Highcharts from 'highcharts';
import {UMAPStore} from '../store/UMAP.store';

accessibility(Highcharts);

/**
 * State
 */

/**
 * @see https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/scatter
 */
const options = ref({
  chart: {
    type: 'scatter',
    zoomType: 'xy',
    panning: true,
    panKey: 'shift',
  },
  credits: {
    enabled: false,
  },
  title: {
    text: '',
  },
  xAxis: {
    title: {
      enabled: false,
    },
    startOnTick: false,
    endOnTick: false,
  },
  yAxis: {
    title: {
      enabled: false,
    },
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 50,
    y: 0,
    floating: true,
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)',
          },
        },
      },
      states: {
        hover: {
          marker: {
            enabled: false,
          },
        },
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        // pointFormat: '{point.x} cm, {point.y} kg',
        pointFormat: '',
      },
    },
  },
  series: [],
});
const rangeMin = ref();
const rangeMax = ref();
const rangeIsAllSelected = ref(true);
const range = ref([rangeMin.value, rangeMax.value]);
const steps = ref({});

/**
 * Handlers
 */

async function fetchData() {
  const {activeIntervalLabel, activeBand} = volumesStore;

  if (!activeIntervalLabel || !activeBand) {
    return;
  }

  try {
    const request = await fetch(`${SERVER_HOSTNAME}/generated/umap/${activeIntervalLabel}/${activeBand}.json`);
    UMAPStore.data = await request.json();
  } catch {
    options.value.series = [];
    UMAPStore.data = null;
  }
}

function generatePlotOptions() {
  if (!UMAPStore.data) {
    return;
  }

  interface Series {
    name: string;
    data: number[][];
    timestamps: number[];
  }

  const series: Series[] = [];

  UMAPStore.data.l.forEach((label, labelIndex) => {
    const labelDoesExist = series.find((item) => item.name === label);
    let target = labelDoesExist;

    if (!labelDoesExist) {
      series.push({
        name: label,
        data: [],
        timestamps: [],
      });

      target = series[series.length - 1];
    }

    // this makes absolutely NO SENSE
    if (!UMAPStore.data || !target) {
      return;
    }

    const timestamp = UMAPStore.data.t[labelIndex];
    const coordinates = UMAPStore.data.X[labelIndex];

    const isWithinRange = timestamp >= range.value[0] && timestamp <= range.value[1];

    if (!isWithinRange && !rangeIsAllSelected.value) {
      return;
    }

    target.data.push(coordinates);
    target.timestamps.push(timestamp);
  });

  // @ts-expect-error: TS2322
  options.value.series = series;
}

function updateRangeSelectAll(nextValue: boolean) {
  rangeIsAllSelected.value = nextValue;
}

function updateRangeSteps() {
  if (!UMAPStore.data) {
    return;
  }

  const timestamps = UMAPStore.data.t;

  interface Steps {
    [date: string]: number;
  }

  const object: Steps = {};

  timestamps.forEach((timestamp) => {
    if (typeof object[timestamp] !== 'undefined') {
      return;
    }

    object[timestamp] = timestamp;
  });

  steps.value = object;
  rangeMin.value = object[Object.keys(object)[0]];
  rangeMax.value = object[Object.keys(object)[Object.keys(object).length - 1]];
  range.value = [rangeMin.value, rangeMax.value];
}

/**
 * Lifecycles
 */

watch(volumesStore, async () => {
  await fetchData();
  generatePlotOptions();
});

watch(UMAPStore, () => {
  updateRangeSteps();
});

watch(range, () => {
  generatePlotOptions();
});

watch(rangeIsAllSelected, () => {
  generatePlotOptions();
});
</script>

<template>
  <n-p>
    <chart :options="options"></chart>
  </n-p>

  <n-p class="range-container">
    <n-checkbox
        v-model:checked="rangeIsAllSelected"
        label="All"
        @update:checked="updateRangeSelectAll"
    />
    <n-slider
        v-model:value="range"
        :disabled="rangeIsAllSelected"
        :marks="steps"
        :max="rangeMax"
        :min="rangeMin"
        :tooltip="false"
        class="test"
        range
        step="mark"
    />
  </n-p>
</template>

<style lang="scss">
.range-container {
  height: 150px;
}

.n-slider-mark {
  position: absolute;
  transform: translate3d(-55%, 20px, 0) rotate(-80deg) !important;
  font-size: 0.7rem;
}
</style>
