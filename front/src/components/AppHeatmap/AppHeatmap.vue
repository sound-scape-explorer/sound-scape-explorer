<script lang="ts" setup="">
import type {Data as PlotlyData, Layout} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import {useHeatmapLayout} from 'src/hooks/useHeatmapLayout';
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
  colorscale: string;
  range: {min: number | undefined; max: number | undefined};
}

const props = defineProps<Props>();

/**
 * State
 */

const {generateLayout} = useHeatmapLayout();
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
      colorscale: props.colorscale,
      reversescale: true,
      x: props.labels,
      y: props.values.length === 1 ? [''] : [...props.labels].reverse(),
      z: [...props.values].reverse(),
      hovertemplate: '%{z:.3f}<extra>%{y}/%{x}</extra>',
      hoverongaps: false,
      xgap: 10,
      ygap: 10,
      zmin: props.range.min,
      zmax: props.range.max,
    },
  ];

  layoutRef.value = generateLayout(props.title ?? '');
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
