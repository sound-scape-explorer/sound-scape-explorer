<script lang="ts" setup>
import Plotly, {
  type Config,
  type DownloadImgopts,
  type Layout,
  type PlotlyHTMLElement,
  type PlotMouseEvent,
} from 'plotly.js-dist-min';
import {triggerCanvasDownload} from 'src/utils/trigger-canvas-download';
import {computed, onMounted, ref, watchEffect} from 'vue';

import {useLabelScreenshot} from '../Label/useLabelScreenshot';
import {useScatterClick} from './useScatterClick';
import {scatterTracesRef, useScatterTraces} from './useScatterTraces';

interface ScatterExportOptions extends DownloadImgopts {
  scale?: number;
}

const divRef = ref<PlotlyHTMLElement | null>(null);
const {handleClick} = useScatterClick();
const {screenshotLabel} = useLabelScreenshot();

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
    plot_bgcolor: 'transparent',
    yaxis: {
      scaleanchor: 'x',
      scaleratio: 1,
    },
    showlegend: false,
  };

  return layout;
});

const scatterWidth = 800;
const scatterHeight = 600;
const scatterScale = 4;

const scatterOptions: ScatterExportOptions = {
  filename: 'test',
  width: scatterWidth,
  height: scatterHeight,
  format: 'svg',
  scale: scatterScale,
};

const config: Partial<Config> = {
  displaylogo: false,
  responsive: true,
  modeBarButtonsToAdd: [
    {
      name: 'download-png',
      title: 'Download as PNG with legend',
      icon: Plotly.Icons.camera,
      click: async (gd) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = scatterWidth * scatterScale;
        canvas.height = scatterHeight * scatterScale;

        if (context === null) {
          return;
        }

        const scatterData = await Plotly.toImage(gd, scatterOptions);
        const scatterImage = new Image();
        scatterImage.src = scatterData;
        scatterImage.onload = () => {
          context.drawImage(scatterImage, 0, 0);
        };

        const legendCanvas = await screenshotLabel();
        if (legendCanvas === null) {
          await Plotly.downloadImage(gd, {...scatterOptions, format: 'png'});
          return;
        }

        const legendContext = legendCanvas?.getContext('2d');
        if (legendContext === null) {
          return;
        }

        const legendScale = 0.5;
        const legendWidth =
          legendContext.canvas.width * scatterScale * legendScale;
        const legendHeight =
          legendContext.canvas.height * scatterScale * legendScale;

        context.drawImage(
          legendCanvas,
          canvas.width - legendWidth,
          canvas.height - legendHeight,
          legendWidth,
          legendHeight,
        );

        triggerCanvasDownload(canvas, 'test');
      },
    },
    {
      name: 'download-svg',
      title: 'Download as SVG without legend',
      icon: Plotly.Icons['camera-retro'],
      click: async (gd) => {
        await Plotly.downloadImage(gd, scatterOptions);
      },
    },
  ],
  modeBarButtonsToRemove: ['toImage'],
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
