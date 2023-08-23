<script lang="ts" setup>
import Plotly, {
  type Config,
  type Layout,
  type PlotlyHTMLElement,
  type PlotMouseEvent,
} from 'plotly.js-dist-min';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';
import {computed, onMounted, ref, watchEffect} from 'vue';

import {useScatterClick} from './useScatterClick';
import {scatterTracesRef, useScatterTraces} from './useScatterTraces';

const divRef = ref<PlotlyHTMLElement | null>(null);
const {handleClick} = useScatterClick();

useScatterTraces();

const handlePlotlyClick = (data: PlotMouseEvent) => {
  if (metaPropertiesRef.value === null || metaSetsRef.value === null) {
    return;
  }

  // @ts-expect-error: 2339
  const intervalIndex = data.points[0].fullData.index;
  handleClick(intervalIndex);
};

const layoutRef = computed<Partial<Layout> | null>(() => {
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
    // uirevision: 'true',
    showlegend: false,
  };
});

const config: Partial<Config> = {
  displaylogo: false,
  responsive: true,
};

const isFirstRenderedRef = ref<boolean>(false);

const renderInitial = async () => {
  if (
    divRef.value === null ||
    layoutRef.value === null ||
    isFirstRenderedRef.value === true
  ) {
    return;
  }

  await Plotly.newPlot(divRef.value, [], layoutRef.value, config);
  isFirstRenderedRef.value = true;
  console.log('first render');
};

onMounted(renderInitial);

const isAttachedRef = ref<boolean>(false);
const attachListeners = () => {
  if (
    divRef.value === null ||
    isFirstRenderedRef.value === false ||
    isAttachedRef.value === true
  ) {
    return;
  }

  divRef.value.on('plotly_click', handlePlotlyClick);
  isAttachedRef.value = true;
};

watchEffect(attachListeners);

const render = async () => {
  if (
    isFirstRenderedRef.value === false ||
    divRef.value === null ||
    layoutRef.value === null ||
    scatterTracesRef.value === null
  ) {
    return;
  }

  await Plotly.react(
    divRef.value,
    scatterTracesRef.value,
    layoutRef.value,
    config,
  );

  console.log('render');
};

watchEffect(render);
</script>

<template>
  <div
    ref="divRef"
    class="container"
  />
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
