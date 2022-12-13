<script lang="ts" setup>
import {onUnmounted, watch} from 'vue';
import Title from '../components/Title.vue';
import VolumesOptions from '../components/VolumesOptions.vue';
import {API_ROUTES} from '../constants';
import VolumesBoxPlot from '../components/VolumesBoxPlot.vue';
import {volumesOptionsStore} from '../store/volumes-options.store';
import {useConfig} from '../composables/useConfig';
import {useSelection} from '../composables/useSelection';
import {selectionImageStore} from '../store/selection-image.store';
import {selectionStore} from '../store/selection.store';
import Selection from '../components/Selection.vue';

const {clearSelection} = useSelection();
const {bands, intervals} = await useConfig();

function handleSelection(band: string, interval: string) {
  if (!band || !interval) {
    selectionStore.band = null;
    selectionStore.interval = null;
    selectionImageStore.image = null;
    return;
  }

  selectionStore.band = band;
  selectionStore.interval = interval;

  selectionImageStore.image = API_ROUTES.volumesImage({
    interval,
    band,
    variable: volumesOptionsStore.activeVariable,
  });
}

watch(selectionStore, () => {
  if (selectionStore.band === null || selectionStore.interval === null) {
    return;
  }

  handleSelection(selectionStore.band, selectionStore.interval);
});

onUnmounted(clearSelection);
</script>

<template>
  <Title text="Volumes" />
  <Selection :bands="bands" :callback="handleSelection" :intervals="intervals || []" />
  <VolumesOptions />
  <VolumesBoxPlot />
</template>

<style lang="scss" scoped>
</style>
