<script lang="ts" setup="">
import Plotly from 'plotly.js-dist-min';
import type {Data as PlotlyData, Layout} from 'plotly.js-dist-min';
import {ref, watch} from 'vue';

type Data = PlotlyData & {
  hoverongaps: boolean;
};

/**
 * Props
 */
interface Props {
  labels: string[];
  values: (number | null)[][];
  title: string;
}

const props = defineProps<Props>();

/**
 * State
 */

const divRef = ref<HTMLDivElement | null>(null);
const dataRef = ref<Data[] | null>(null);
const layoutRef = ref<Partial<Layout> | null>(null);

/**
 * Lifecycles
 */

refresh();
watch([divRef, dataRef, layoutRef], render);
watch(props, refresh);

/**
 * Handlers
 */

async function render() {
  if (
    divRef.value === null ||
    dataRef.value === null ||
    layoutRef.value === null
  ) {
    return;
  }

  await Plotly.newPlot(divRef.value, dataRef.value, layoutRef.value, {
    displaylogo: false,
  });
}

function refresh() {
  dataRef.value = [
    {
      type: 'heatmap',
      colorscale: 'YlOrRd',
      reversescale: true,
      x: props.labels,
      y: [...props.labels].reverse(),
      z: [...props.values].reverse(),
      hoverongaps: false,
      hovertemplate: '%{z:.3f}<extra>%{y}/%{x}</extra>',
    },
  ];

  layoutRef.value = {
    title: props.title,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    clickmode: 'none',
    showlegend: false,
  };
}
</script>

<template>
  <span
    ref="divRef"
    class="heatmap"
  />
</template>

<style lang="scss" scoped>
.histogram {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
