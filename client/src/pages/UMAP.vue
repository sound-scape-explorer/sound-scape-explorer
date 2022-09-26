<script lang="ts" setup>
import {NP} from 'naive-ui';
import TableBandByInterval from '../components/TableBandByInterval.vue';
import {fetchConfig} from '../utils/fetch-config';
import {parseBands} from '../utils/parse-bands';
import {parseIntervalLabels} from '../utils/parse-interval-labels';

const config = await fetchConfig();
const bands = parseBands(config);
const intervalLabels = parseIntervalLabels(config);
</script>

<template>
  <n-p>
    UMAP
  </n-p>

  <TableBandByInterval :bands="bands" :intervals="intervalLabels" image-type="umap" />
</template>
