<script lang="ts" setup="">
import Plotly, {Data as PlotlyData, Layout} from 'plotly.js-dist-min';
import {ref, unref, watch} from 'vue';

type Data =
  & PlotlyData
  & {
  hoverongaps: boolean;
}

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

const divRef = ref<HTMLDivElement>();
const dataRef = ref<Data[]>();
const layoutRef = ref<Partial<Layout>>();

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
  const div = unref(divRef);
  const data = unref(dataRef);
  const layout = unref(layoutRef);

  if (
    !div
    || !data
    || !layout
  ) {
    return;
  }

  await Plotly.newPlot(div, data, layout, {displaylogo: false});
}

function refresh() {
  dataRef.value = [{
    type: 'heatmap',
    colorscale: 'YlOrRd',
    reversescale: true,
    x: props.labels,
    y: [...props.labels].reverse(),
    z: [...props.values].reverse(),
    hoverongaps: false,
    hovertemplate: '%{z:.3f}<extra>%{y}/%{x}</extra>',
  }];

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
  <span ref="divRef" class="heatmap" />
</template>

<style lang="scss" scoped>
.histogram {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
