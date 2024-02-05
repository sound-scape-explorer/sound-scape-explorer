<script lang="ts" setup="">
import Plotly, {type Config, type Layout} from 'plotly.js-dist-min';
import {digestedRef} from 'src/components/Digested/useDigested';
import {settingsStore} from 'src/components/Settings/settingsStore';
import {type HeatmapData, useHeatmapData} from 'src/hooks/useHeatmapData';
import {useHeatmapLayout} from 'src/hooks/useHeatmapLayout';
import {heatmapHeightRef, heatmapWidthRef} from 'src/hooks/useHeatmapSize';
import {usePlotConfig} from 'src/hooks/usePlotConfig';
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
const {generateConfig} = usePlotConfig(
  digestedRef.value?.digester.name ?? 'heatmap',
);
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
    x: props.labels.map((l) => l.trim()),
    y: props.labels.map((l) => l.trim()),
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
