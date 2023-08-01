<script lang="ts" setup="">
import {ImageOutline} from '@vicons/ionicons5';
import html2canvas from 'html2canvas';
import {configBandRef} from 'src/hooks/useConfigBands';
import {configIntegrationRef} from 'src/hooks/useConfigIntegrations';
import AppButton from '../AppButton/AppButton.vue';
import {computed} from 'vue';

const isReadyRef = computed<boolean>(() => {
  if (configBandRef.value === null || configIntegrationRef.value === null) {
    return false;
  }

  return true;
});

async function screenshot() {
  if (configBandRef.value === null || configIntegrationRef.value === null) {
    return;
  }

  const targetElement = document.body;

  const canvas = await html2canvas(targetElement);
  const bandName = configBandRef.value.name;
  const integrationSeconds = configIntegrationRef.value.duration;

  canvas.style.display = 'none';
  document.body.appendChild(canvas);

  const image = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');
  const anchor = document.createElement('a');
  anchor.download = `SSE_${bandName}_${integrationSeconds}.png`;
  anchor.href = image;
  anchor.click();
  canvas.remove();
}
</script>

<template>
  <AppButton
    :disabled="!isReadyRef"
    :handle-click="screenshot"
    text="Screenshot"
  >
    <image-outline />
  </AppButton>
</template>
