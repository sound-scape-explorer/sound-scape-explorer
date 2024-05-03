<script lang="ts" setup="">
import Plotly, {type Config, type Layout} from 'plotly.js-dist-min';
import {
  type HeatmapData,
  useAppHeatmapData,
} from 'src/app/heatmap/app-heatmap-data';
import {useAppHeatmapLayout} from 'src/app/heatmap/app-heatmap-layout';
import {useAppHeatmapSize} from 'src/app/heatmap/app-heatmap-size';
import {useClientSettings} from 'src/composables/client-settings';
import {usePlotConfig} from 'src/composables/plot-config';
import {ref, watch} from 'vue';

/**
 * Props
 */

interface Props {
  title?: string;
  x: string[];
  y: string[];
  values: (number | null)[][];
  colorscale: string;
  range: {min: number | undefined; max: number | undefined};
  exportName?: string;
}

const props = defineProps<Props>();

/**
 * State
 */

const {plotBackground} = useClientSettings();
const {width, height} = useAppHeatmapSize();
const {createLayout} = useAppHeatmapLayout();
const {buildData} = useAppHeatmapData();
const {generateConfig} = usePlotConfig(props.exportName ?? 'heatmap');
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
    x: props.x.map((x) => x.trim()),
    y: props.y.map((y) => y.trim()),
    z: props.values,
    zmin: props.range.min,
    zmax: props.range.max,
  });

  dataRef.value = [data];
  layoutRef.value = createLayout(props.title ?? '');
  configRef.value = generateConfig();
};

/**
 * Lifecycles
 */

refresh();
watch([divRef, dataRef, layoutRef], render);
watch(props, refresh);
watch([width, height, plotBackground], refresh);
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
