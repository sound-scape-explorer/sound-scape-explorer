<script lang="ts" setup>
import {ref, watch} from 'vue';
import Title from '../components/Title.vue';
import VolumesOptions from '../components/VolumesOptions.vue';
import SelectionTable from '../components/SelectionTable.vue';
import SelectionImage from '../components/SelectionImage.vue';
import {SERVER_HOSTNAME} from '../constants';
import VolumesBoxPlot from '../components/VolumesBoxPlot.vue';
import {selectionStore} from '../store/selection.store';
import {useConfig} from '../composables/useConfig';

/**
 * Props
 */

const {bands, intervals} = await useConfig();

/**
 * State
 */

const imageSource = ref<string | null>();

/**
 * Handlers
 */

function handleSelection(band: string, interval: string) {
  if (!band || !interval) {
    selectionStore.activeBand = null;
    selectionStore.activeInterval = null;
    imageSource.value = null;
    return;
  }

  selectionStore.activeBand = band;
  selectionStore.activeInterval = interval;
  imageSource.value = `${SERVER_HOSTNAME}/generated/single/volume/${interval}/${band}.${selectionStore.activeVariable}.png`;
}

watch(selectionStore, () => {
  if (selectionStore.activeBand === null || selectionStore.activeInterval === null) {
    return;
  }

  handleSelection(selectionStore.activeBand, selectionStore.activeInterval);
});
</script>

<template>
  <Title text="Volumes" />
  <VolumesOptions />
  <VolumesBoxPlot />
  <SelectionTable :callback="handleSelection" :xs="bands" :ys="intervals" />
  <SelectionImage v-if="imageSource" :source="imageSource" />
</template>
