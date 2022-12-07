<script lang="ts" setup>
import {ref, watch} from 'vue';
import {NP} from 'naive-ui';
import {Chart} from 'highcharts-vue';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import accessibility from 'highcharts/modules/accessibility';
import {API_ROUTES} from '../constants';
import type {ApiVolumeInterface} from '../interfaces/api-volume.interface';
import {selectionStore} from '../store/selection.store';
import {getQuartiles} from '../utils/get-quartiles';
import {convertTimestampToDate} from '../utils/convert-timestamp-to-date';

accessibility(Highcharts);
highchartsMore(Highcharts);

/**
 * State
 */

const fetchedData = ref<ApiVolumeInterface>();

interface Options {
  chart: {
    type: string;
  };
  credits: {
    enabled: boolean;
  };
  title: {
    text: string;
  };
  yAxis: {
    title: {
      text: string;
    };
  };
  series: Array<{
    name: string;
    data: (string | number)[][];
    tooltip: {
      headerFormat: string;
    };
  }>;
}

const options = ref<Options>({
  chart: {
    type: 'boxplot',
  },
  credits: {
    enabled: false,
  },
  title: {
    text: '',
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  series: [],
});

/**
 * Handlers
 */

async function updateData() {
  const {activeBand, activeInterval} = selectionStore;

  if (activeBand === null || activeInterval === null) {
    return;
  }

  try {
    const endpoint = API_ROUTES.volumes({
      interval: activeInterval,
      band: activeBand,
    });

    const request = await fetch(endpoint);
    fetchedData.value = await request.json();
  } catch {
    options.value.series = [];
    fetchedData.value = undefined;
  }
}

function resetPlot() {
  options.value.series = [];
}

function parseData() {
  const {activeSites, activeRange, activeBand, activeInterval} = selectionStore;

  if (
    activeSites.length === 0
      || activeRange === null
      || !fetchedData.value
      || activeBand === null
      || activeInterval === null
  ) {
    return;
  }

  options.value.series = [];

  // TODO: Move this to backend
  activeSites.forEach((activeSite) => {
    const key = `${activeRange} ${activeSite}`;
    const source = fetchedData.value?.data[key];

    if (!source) {
      return;
    }

    const timestamps = source.t; // seconds
    const values = source[selectionStore.activeVariable];
    const delta = selectionStore.activeAggregate;

    const data: (string | number)[][] = [[]];

    let startTime = timestamps[0];

    timestamps.forEach((timestamp, i) => {
      const isOver = timestamp > startTime + delta;

      if (isOver) {
        data.push([]);
        startTime = timestamp;
      }

      data[data.length - 1].push(values[i]);
    });

    // TODO: Move this!!
    data.forEach((box, k) => {
      data[k] = [convertTimestampToDate(startTime * 1000), ...getQuartiles(box.map((b) => typeof b === 'string' ? Number(b) : b))];
    });

    options.value.series.push({
      name: activeSite,
      data,
      tooltip: {
        headerFormat: '<em>{point.key}</em><br/>',
      },
    });
  });
}

/**
 * Lifecycles
 */

watch(selectionStore, async () => {
  await updateData();
  resetPlot();
  parseData();
});
</script>

<template>
  <n-p>
    <chart :options="options"></chart>
  </n-p>
</template>
