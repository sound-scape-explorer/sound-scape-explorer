<script lang="ts" setup="">
import type {Data, Layout} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import {ref, watch} from 'vue';

interface Props {
  labels: string[];
  values: number[];
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
      type: 'bar',
      x: labels,
      y: values,
      hovertemplate: '%{y:.3f}<extra>%{x}</extra>',
    },
  ];

  const layout: Partial<Layout> = {
    title,
  };

  await Plotly.newPlot(div.value, data, layout);
});
</script>

<template>
  <div ref="div" class="histogram"></div>
</template>

<style lang="scss" scoped>
.histogram {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
