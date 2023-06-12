<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import Plotly, {
  type Config,
  type Layout,
  type PlotMouseEvent,
  type PlotlyHTMLElement,
} from 'plotly.js-dist-min';
import {useScatterClick} from '../Scatter/useScatterClick';
import {
  newScatterColorScaleRef,
  scatterTracesRef,
  useScatterTraces,
} from './useScatterTraces';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {metaIndexRef} from './useScatterTraces';
import {pointIndexGroupsRef} from './useScatterTraces';

const divRef = ref<PlotlyHTMLElement | null>(null);
const {handleClick} = useScatterClick();
useScatterTraces();

const handlePlotlyClick = (data: PlotMouseEvent) => {
  if (
    pointIndexGroupsRef.value === null ||
    metaPropertiesRef.value === null ||
    metaSetsRef.value === null ||
    metaIndexRef.value === null
  ) {
    return;
  }

  // @ts-expect-error: 2339
  const metaValue = data.points[0].fullData.name;
  const metaSetIndex = metaSetsRef.value[metaIndexRef.value].indexOf(metaValue);
  const pointNumber = data.points[0].pointNumber;
  const pointIndex = pointIndexGroupsRef.value[metaSetIndex][pointNumber];
  handleClick(pointIndex);
};

const layoutRef = computed<Partial<Layout>>(() => {
  return {
    // title: 'hello',
    margin: {
      t: 0,
      r: 0,
      b: 0,
      l: 0,
    },
    plot_bgcolor: 'transparent',
    // paper_bgcolor: 'transparent',
    yaxis: {
      scaleanchor: 'x',
      scaleratio: 1,
    },
    uirevision: 1,
    colorway: newScatterColorScaleRef.value,
    showlegend: false,
  };
});

const config: Partial<Config> = {
  displaylogo: false,
  responsive: true,
};

const render = async () => {
  if (scatterTracesRef.value === null || divRef.value === null) {
    return;
  }

  console.log('render');

  // TODO: Handle first draw then react
  await Plotly.react(
    divRef.value,
    scatterTracesRef.value,
    layoutRef.value,
    config,
  );

  // TODO: Attach event listeners on first draw
  divRef.value.on('plotly_click', handlePlotlyClick);
};

watch(scatterTracesRef, render);
</script>

<template>
  <div
    class="container"
    ref="divRef"
  />
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
}
</style>
