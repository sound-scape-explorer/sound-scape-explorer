<script lang="ts" setup>
import {onUnmounted, watch} from 'vue';
import Selection from '../components/Selection.vue';
import Title from '../components/Title.vue';
import VolumesBoxPlot from '../components/VolumesBoxPlot.vue';
import VolumesOptions from '../components/VolumesOptions.vue';
import {useConfig} from '../composables/useConfig';
import {useSelection} from '../composables/useSelection';
import {API_ROUTES} from '../constants';
import {selectionImageStore} from '../store/selection-image.store';
import {selectionStore} from '../store/selection.store';
import {volumesOptionsStore} from '../store/volumes-options.store';

const {clearSelection} = useSelection();
const {bands, intervals} = await useConfig();

const intervalsAsStrings = intervals.map((i) => i.toString());

function handleSelectionUpdate(band: string, interval: string) {
  if (!band || !interval) {
    selectionStore.band = null;
    selectionStore.integration = null;
    selectionImageStore.image = null;
    return;
  }

  selectionStore.band = band;
  selectionStore.integration = interval;

  selectionImageStore.image = API_ROUTES.volumesImage({
    integration: interval,
    band,
    variable: volumesOptionsStore.activeVariable,
  });
}

watch(selectionStore, () => {
  if (selectionStore.band === null || selectionStore.integration === null) {
    return;
  }

  handleSelectionUpdate(selectionStore.band, selectionStore.integration);
});

onUnmounted(clearSelection);
</script>

<template>
  <Title text="Volumes" />
  <Selection :bands="bands" :callback="handleSelectionUpdate" :integrations="intervalsAsStrings" />
  <VolumesOptions />
  <VolumesBoxPlot />
</template>
