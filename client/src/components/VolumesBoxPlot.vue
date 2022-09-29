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

accessibility(Highcharts);
highchartsMore(Highcharts);

/**
 * State
 */

const fetchedData = ref<ApiVolumeInterface>();

const options = ref({
  chart: {
    type: 'boxplot',
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  title: {
    text: 'Volume Box Plot',
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  series: [{
    name: 'Observations',
    data: [
      [760, 801, 848, 895, 965],
      [760, 801, 848, 895, 965],
      [760, 801, 848, 895, 965],
      [760, 801, 848, 895, 965],
      [760, 801, 848, 895, 965],
      [760, 801, 848, 895, 965],
      [760, 801, 848, 895, 965],
    ],
    tooltip: {
      headerFormat: '<em>Experiment No {point.key}</em><br/>',
    },
  }],
});

/**
 * Handlers
 */

async function updateData() {
  const {activeBand, activeInterval} = volumesStore;

  if (activeBand === null || activeInterval === null) {
    return;
  }

  const request = await fetch(`${SERVER_HOSTNAME}/generated/single/volume/${activeInterval}/${activeBand}.json`);
  fetchedData.value = await request.json();
  // console.log(fetchedData.value?.data['first4min site1'][volumesStore.activeVariable]);
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

  activeSites.forEach((activeSite) => {
    const key = `${activeRange} ${activeSite}`;
    console.log(key);

    const data = fetchedData.value?.data[key][volumesStore.activeVariable];

    if (!data) {
      return;
    }

    const values = data.flat().sort();

    let groupedValues: number[][] = [];

    for (let i = 0; i < values.length; ++i) {
      const isNewGroup = i % 4 === 0;

      if (!isNewGroup) {
        groupedValues[groupedValues.length - 1].push(values[i]);
        continue;
      }

      groupedValues = [
        ...groupedValues,
        [values[i]],
      ];
    }

    options.value.series[0].data = groupedValues;

    // console.log(options.value.series[0].data);
  });
}

/**
 * Lifecycles
 */

watch(volumesStore, async () => {
  await updateData();
  parseData();
});
</script>

<template>
  <n-p>
    <chart :options="options"></chart>
  </n-p>
</template>
