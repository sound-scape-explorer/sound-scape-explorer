<script lang="ts" setup>
import {ref, watch} from 'vue';
import Title from '../components/Title.vue';
import VolumesOptions from '../components/VolumesOptions.vue';
import SelectionTable from '../components/SelectionTable.vue';
import SelectionImage from '../components/SelectionImage.vue';
import {SERVER_HOSTNAME} from '../constants';
import VolumesBoxPlot from '../components/VolumesBoxPlot.vue';
import {volumesStore} from '../store/volumes.store';
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
    volumesStore.activeBand = null;
    volumesStore.activeInterval = null;
    imageSource.value = null;
    return;
  }

  volumesStore.activeBand = band;
  volumesStore.activeInterval = interval;
  imageSource.value = `${SERVER_HOSTNAME}/generated/single/volume/${interval}/${band}.${volumesStore.activeVariable}.png`;
}

watch(volumesStore, () => {
  if (volumesStore.activeBand === null || volumesStore.activeInterval === null) {
    return;
  }

  handleSelection(volumesStore.activeBand, volumesStore.activeInterval);
});
</script>

<template>
  <Title text="Volumes" />
  <VolumesOptions />
  <VolumesBoxPlot />
  <SelectionTable :callback="handleSelection" :xs="bands" :ys="intervals" />
  <SelectionImage v-if="imageSource" :source="imageSource" />
</template>
