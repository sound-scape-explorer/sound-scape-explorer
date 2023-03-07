<script lang="ts" setup>
import {onUnmounted, watch} from 'vue';
import Selection from '../components/Selection.vue';
import Title from '../components/Title.vue';
import VolumesBoxPlot from '../components/VolumesBoxPlot.vue';
import VolumesOptions from '../components/VolumesOptions.vue';
import {useSelection} from '../composables/useSelection';
import {useStorage} from '../composables/useStorage';
import {selectionStore} from '../store/selection.store';

const {
  getBands,
  getIntegrations,
} = await useStorage();
const bands = await getBands();
const integrations = await getIntegrations();

const {clearSelection} = useSelection();
onUnmounted(clearSelection);

function handleSelectionChange(band: string, interval: string) {
  if (!band || !interval) {
    selectionStore.band = null;
    selectionStore.integration = null;
    return;
  }

  selectionStore.band = band;
  selectionStore.integration = interval;
}

watch(selectionStore, () => {
  if (selectionStore.band === null || selectionStore.integration === null) {
    return;
  }

  handleSelectionChange(selectionStore.band, selectionStore.integration);
});
</script>

<template>
  <Title text="Volumes" />
  <Selection
      :bands="Object.keys(bands)"
      :callback="handleSelectionChange"
      :integrations="integrations"
  />
  <VolumesOptions />
  <VolumesBoxPlot />
</template>
