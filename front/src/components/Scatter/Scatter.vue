<script lang="ts" setup>
import Plotly, {
  type Layout,
  type PlotlyHTMLElement,
  type PlotMouseEvent,
} from 'plotly.js-dist-min';
import {settingsStore} from 'src/components/Settings/settingsStore';
import {computed, onMounted, ref, watchEffect} from 'vue';

import {useScatterCamera} from './useScatterCamera';
import {useScatterClick} from './useScatterClick';
import {useScatterConfig} from './useScatterConfig';
import {scatterTracesRef, useScatterTraces} from './useScatterTraces';

const divRef = ref<PlotlyHTMLElement | null>(null);
const {handleClick} = useScatterClick();
const {config} = useScatterConfig();
const {isLocked} = useScatterCamera();

useScatterTraces();

const handlePlotlyClick = (data: PlotMouseEvent) => {
  const intervalIndex = data.points[0].pointNumber;
  handleClick(intervalIndex);
};

const layoutRef = computed<Partial<Layout> | null>(() => {
  const layout: Partial<Layout> = {
    // title: 'hello',
    margin: {
      t: 0,
      r: 0,
      b: 0,
      l: 0,
    },
    plot_bgcolor: settingsStore.plotBackground,
    yaxis: {
      scaleanchor: 'x',
      scaleratio: 1,
    },
    showlegend: false,
  };

  return layout;
});

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
    :style="{'--pointer-events': isLocked ? 'none' : 'all'}"
    class="container"
  />
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  pointer-events: var(--pointer-events);
}
</style>
