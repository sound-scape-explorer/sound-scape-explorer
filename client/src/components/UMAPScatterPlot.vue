<script lang="ts" setup>
import {ref, watch} from 'vue';
import {NP} from 'naive-ui';
import {Chart} from 'highcharts-vue';
import {SERVER_HOSTNAME} from '../constants';
import {volumesStore} from '../store/volumes.store';
import accessibility from 'highcharts/modules/accessibility';
import Highcharts from 'highcharts';
import {UMAPStore} from '../store/UMAP.store';

accessibility(Highcharts);

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

function processData() {
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

    target.data.push(UMAPStore.data.X[labelIndex]);
    target.timestamps.push(UMAPStore.data.t[labelIndex]);
  });

  // @ts-expect-error: TS2322
  options.value.series = series;
}

/**
 * Lifecycles
 */

watch(volumesStore, async () => {
  await fetchData();
  processData();
});
</script>

<template>
  <n-p>
    <chart :options="options"></chart>
  </n-p>
</template>
