<script lang="ts" setup="">
import Plotly, {type Config, type Layout} from 'plotly.js-dist-min';
import {settingsStore} from 'src/components/Settings/settingsStore';
import {useHeatmapConfig} from 'src/hooks/useHeatmapConfig';
import {type HeatmapData, useHeatmapData} from 'src/hooks/useHeatmapData';
import {useHeatmapLayout} from 'src/hooks/useHeatmapLayout';
import {heatmapHeightRef, heatmapWidthRef} from 'src/hooks/useHeatmapSize';
import {ref, watch} from 'vue';

/**
 * Props
 */
interface Props {
  title?: string;
  x: string[];
  y: string[];
  values: {[key: string]: number[][]};
  colorscale: string;
  range: {min: number | undefined; max: number | undefined};
}

const props = defineProps<Props>();

/**
 * State
 */

const {generateLayout} = useHeatmapLayout();
const {generateData} = useHeatmapData();
const {generateConfig} = useHeatmapConfig();
const divRef = ref<HTMLDivElement | null>(null);
const dataRef = ref<HeatmapData[] | null>(null);
const layoutRef = ref<Partial<Layout> | null>(null);
const configRef = ref<Partial<Config> | null>(null);

/**
 * Handlers
 */

const render = async () => {
  if (
    divRef.value === null ||
    dataRef.value === null ||
    layoutRef.value === null ||
    configRef.value === null
  ) {
    return;
  }

  await Plotly.newPlot(
    divRef.value,
    dataRef.value,
    layoutRef.value,
    configRef.value,
  );
};

const refresh = () => {
  const data = generateData({
    colorscale: props.colorscale,
    x: props.x,
    y: props.y,
    z: props.values,
    zmin: props.range.min,
    zmax: props.range.max,
  });

  dataRef.value = [data];
  layoutRef.value = generateLayout(props.title ?? '');
  configRef.value = generateConfig();
};

/**
 * Lifecycles
 */

refresh();
watch([divRef, dataRef, layoutRef], render);
watch(props, refresh);
watch([heatmapWidthRef, heatmapHeightRef, settingsStore], refresh);
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
