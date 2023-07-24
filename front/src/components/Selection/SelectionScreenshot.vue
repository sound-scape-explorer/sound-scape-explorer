<script lang="ts" setup="">
import {ImageOutline} from '@vicons/ionicons5';
import AppButton from '../AppButton/AppButton.vue';
import {isDatasetReadyRef} from '../Scatter/useScatterDataset';
import {scatterRef} from '../Scatter/useScatterContainer';
import {settingsStore} from '../Settings/settingsStore';
import html2canvas from 'html2canvas';
import {configBandRef} from 'src/hooks/useConfigBands';
import {configIntegrationRef} from 'src/hooks/useConfigIntegrations';

async function screenshot() {
  if (
    configBandRef.value === null ||
    configIntegrationRef.value === null ||
    scatterRef.value === null
  ) {
    return;
  }

  let targetElement: HTMLElement = scatterRef.value;

  if (settingsStore.fullPageScreenshot) {
    targetElement = document.body;
  }

  const canvas = await html2canvas(targetElement);
  const bandName = configBandRef.value.name;
  const integrationSeconds = configIntegrationRef.value.duration;

  canvas.style.display = 'none';
  document.body.appendChild(canvas);

  setTimeout(() => {
    const image = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const anchor = document.createElement('a');
    anchor.download = `SSE_${bandName}_${integrationSeconds}.png`;
    anchor.href = image;
    anchor.click();
    canvas.remove();
  }, 2000);
}
</script>

<template>
  <AppButton
    :disabled="!isDatasetReadyRef.value"
    :handle-click="screenshot"
    text="Screenshot"
  >
    <image-outline />
  </AppButton>
</template>
