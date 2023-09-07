<script lang="ts" setup="">
import type {Data as PlotlyData, Layout} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import {ref, watch} from 'vue';

type Data = PlotlyData & {
  hoverongaps: boolean;
};

/**
 * Props
 */
interface Props {
  title?: string;
  labels: string[];
  values: (number | null)[][];
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
  console.log(props.values);
  dataRef.value = [
    {
      type: 'heatmap',
      colorscale: 'Blues',
      reversescale: true,
      x: props.labels,
      y: props.values.length === 1 ? [''] : [...props.labels].reverse(),
      z: [...props.values].reverse(),
      hovertemplate: '%{z:.3f}<extra>%{y}/%{x}</extra>',
      hoverongaps: false,
      xgap: 10,
      ygap: 10,
    },
  ];

  layoutRef.value = {
    title: props.title,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    clickmode: 'none',
    showlegend: false,
    width: 500,
    height: 500,
    xaxis: {
      zeroline: false,
      showgrid: false,
      fixedrange: true,
      ticks: '',
      type: 'category',
      tickmode: 'linear',
    },
    yaxis: {
      zeroline: false,
      showgrid: false,
      fixedrange: true,
      ticks: '',
      type: 'category',
      tickmode: 'linear',
    },
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
