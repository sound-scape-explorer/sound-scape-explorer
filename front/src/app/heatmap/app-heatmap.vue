<script lang="ts" setup="">
import Plotly, {type Config, type Layout} from 'plotly.js-dist-min';
import {
  type HeatmapData,
  useAppHeatmapData,
} from 'src/app/heatmap/use-app-heatmap-data';
import {useAppHeatmapLayout} from 'src/app/heatmap/use-app-heatmap-layout';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import {useBasePlotConfig} from 'src/composables/use-base-plot-config';
import {useClientSettings} from 'src/composables/use-client-settings';
import {ref, watch} from 'vue';

// todo: split me

/**
 * Props
 */

interface Props {
  title?: string;
  labels: string[];
  values: (number | null)[][];
  colorscale: string;
  range: {min: number | undefined; max: number | undefined};
  exportName?: string;
}

const props = defineProps<Props>();

/**
 * State
 */

const {fontSize, width, height} = useAppHeatmapSize();
const {plotBackground, isPlotAutoMargin} = useClientSettings();
const {createLayout} = useAppHeatmapLayout();
const {buildData} = useAppHeatmapData();
const {generateConfig} = useBasePlotConfig();
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
  const data = buildData({
    colorscale: props.colorscale,
    x: props.labels.map((l) => l.trim()),
    y: props.labels.map((l) => l.trim()),
    z: props.values,
    zmin: props.range.min,
    zmax: props.range.max,
  });

  dataRef.value = [data];
  layoutRef.value = createLayout(props.title ?? '');
  configRef.value = generateConfig(props.exportName ?? 'heatmap');
};

/**
 * Lifecycles
 */

refresh();
watch([divRef, dataRef, layoutRef], render);
watch(props, refresh);
watch([fontSize, width, height, plotBackground, isPlotAutoMargin], refresh);
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
