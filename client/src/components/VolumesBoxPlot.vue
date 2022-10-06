<script lang="ts" setup>
import {ref, watch} from 'vue';
import {NP} from 'naive-ui';
import {Chart} from 'highcharts-vue';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import accessibility from 'highcharts/modules/accessibility';
import {SERVER_HOSTNAME} from '../constants';
import type {ApiVolumeInterface} from '../interfaces/api-volume.interface';
import {volumesStore} from '../store/volumes.store';
import {getQuartiles} from '../utils/get-quartiles';

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
  const {activeBand, activeInterval} = volumesStore;

  if (activeBand === null || activeInterval === null) {
    return;
  }

  try {
    const request = await fetch(`${SERVER_HOSTNAME}/generated/single/volume/${activeInterval}/${activeBand}.json`);
    fetchedData.value = await request.json();
    // console.log(fetchedData.value?.data['first4min site1'][volumesStore.activeVariable]);
  } catch {
    options.value.series = [];
    fetchedData.value = undefined;
  }
}

function resetPlot() {
  options.value.series = [];
}

function parseData() {
  const {activeSites, activeRange, activeBand, activeInterval} = volumesStore;

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

  activeSites.forEach((activeSite) => {
    const key = `${activeRange} ${activeSite}`;
    const source = fetchedData.value?.data[key];

    if (!source) {
      return;
    }

    const timestamps = source.t; // seconds
    const values = source[volumesStore.activeVariable];
    const delta = volumesStore.activeAggregate;

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

    data.forEach((box, k) => {
      data[k] = [new Date(startTime * 1000).toString(), ...getQuartiles(box.map((b) => typeof b === 'string' ? Number(b) : b))];
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

watch(volumesStore, async () => {
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
