<script lang="ts" setup="">
import type {Data, Layout} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import {ref, watch} from 'vue';

interface Props {
  labels: string[];
  values: number[][];
  title: string;
}

const {labels, values, title} = defineProps<Props>();

const div = ref();

watch(div, async () => {
  if (!div.value) {
    return;
  }

  const data: Data[] = [
    {
      type: 'heatmap',
      colorscale: 'YlOrRd',
      reversescale: true,
      x: labels,
      y: [...labels].reverse(),
      z: [...values].reverse(),
      hoverongaps: false,
      hovertemplate: '%{z:.3f}<extra>%{x}/%{y}</extra>',
    },
  ] as Data[];

  const layout: Partial<Layout> = {
    title,
  };

  await Plotly.newPlot(div.value, data, layout);
});
</script>

<template>
  <div ref="div" class="heatmap" />
</template>

<style lang="scss" scoped>
.heatmap {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
