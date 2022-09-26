<script lang="ts" setup>
import {NP} from 'naive-ui';
import TableBandByInterval from '../components/TableBandByInterval.vue';
import {fetchConfig} from '../utils/fetch-config';
import {parseBands} from '../utils/parse-bands';
import {parseIntervals} from '../utils/parse-intervals';

const config = await fetchConfig();
const bands = parseBands(config);
const intervals = parseIntervals(config);
</script>

<template>
  <n-p>
    Covering
  </n-p>

  <TableBandByInterval :bands="bands" :intervals="intervals" image-type="covering" />
</template>
