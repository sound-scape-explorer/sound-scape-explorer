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
  getStorageBands,
  getStorageIntegrations,
} = await useStorage()
const bands = await getStorageBands()
const integrations = await getStorageIntegrations()

const {clearSelection} = useSelection();
onUnmounted(clearSelection);

function handleSelectionChange(band: string, interval: string) {
  if (!band || !interval) {
    selectionStore.band = null;
    selectionStore.umapName = null;
    return;
  }

  selectionStore.band = band;
  selectionStore.umapName = interval;
}

watch(selectionStore, () => {
  if (selectionStore.band === null || selectionStore.umapName === null) {
    return;
  }

  handleSelectionChange(selectionStore.band, selectionStore.umapName);
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
