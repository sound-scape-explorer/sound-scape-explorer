<script lang="ts" setup="">
import type {Layout} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import {type HeatmapData, useHeatmapData} from 'src/hooks/useHeatmapData';
import {useHeatmapLayout} from 'src/hooks/useHeatmapLayout';
import {ref, watch} from 'vue';

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
const {generateData} = useHeatmapData();
const divRef = ref<HTMLDivElement | null>(null);
const dataRef = ref<HeatmapData[] | null>(null);
const layoutRef = ref<Partial<Layout> | null>(null);

/**
 * Handlers
 */

const render = async () => {
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
};

const refresh = () => {
  const data = generateData({
    colorscale: props.colorscale,
    x: props.labels,
    y: props.labels,
    z: props.values,
    zmin: props.range.min,
    zmax: props.range.max,
  });

  dataRef.value = [data];
  layoutRef.value = generateLayout(props.title ?? '');
};

/**
 * Lifecycles
 */

refresh();
watch([divRef, dataRef, layoutRef], render);
watch(props, refresh);
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
