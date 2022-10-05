<script lang="ts" setup>
import {ref} from 'vue';
import {useConfig} from '../composables/useConfig';
import Title from '../components/Title.vue';
import SelectionTable2d from '../components/SelectionTable.vue';
import {SERVER_HOSTNAME} from '../constants';
import SelectionImage from '../components/SelectionImage.vue';
import UMAPScatterPlot from '../components/UMAPScatterPlot.vue';
import {volumesStore} from '../store/volumes.store';
import UMAPTimeline from '../components/UMAPTimeline.vue';

const {bands, intervalLabels} = await useConfig();

const image = ref<string | null>();

function setImage(band: string, intervalLabel: string) {
  if (!band || !intervalLabel) {
    volumesStore.activeBand = null;
    volumesStore.activeIntervalLabel = null;
    image.value = null;
    return;
  }

  volumesStore.activeBand = band;
  volumesStore.activeIntervalLabel = intervalLabel;
  image.value = `${SERVER_HOSTNAME}/generated/umap/${intervalLabel}/${band}.png`;
}
</script>

<template>
  <Title text="UMAP" />
  <UMAPScatterPlot />
  <UMAPTimeline />
  <SelectionTable2d :callback="setImage" :xs="bands" :ys="intervalLabels" />
  <SelectionImage v-if="image" :source="image" />
</template>
