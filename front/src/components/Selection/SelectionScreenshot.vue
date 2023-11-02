<script lang="ts" setup="">
import {ImageOutline} from '@vicons/ionicons5';
import html2canvas from 'html2canvas';
import {bandRef} from 'src/hooks/useBands';
import {integrationRef} from 'src/hooks/useIntegrations';
import {triggerCanvasDownload} from 'src/utils/trigger-canvas-download';

import AppButton from '../AppButton/AppButton.vue';

async function screenshot() {
  if (bandRef.value === null || integrationRef.value === null) {
    return;
  }

  const targetElement = document.body;

  const canvas = await html2canvas(targetElement);
  const bandName = bandRef.value.name;
  const integrationSeconds = integrationRef.value.seconds;

  const name = `SSE_${bandName}_${integrationSeconds}`;
  triggerCanvasDownload(canvas, name);
}
</script>

<template>
  <AppButton
    :handle-click="screenshot"
    text="Screenshot"
  >
    <image-outline />
  </AppButton>
</template>
