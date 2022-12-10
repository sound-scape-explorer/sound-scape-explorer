<script lang="ts" setup>
import {ref, watch} from 'vue';
import Title from '../components/Title.vue';
import VolumesOptions from '../components/VolumesOptions.vue';
import SelectionTable from '../components/SelectionTable.vue';
import SelectionImage from '../components/SelectionImage.vue';
import {API_ROUTES} from '../constants';
import VolumesBoxPlot from '../components/VolumesBoxPlot.vue';
import {volumesOptionsStore} from '../store/volumes-options.store';
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
    volumesOptionsStore.activeBand = null;
    volumesOptionsStore.activeInterval = null;
    imageSource.value = null;
    return;
  }

  volumesOptionsStore.activeBand = band;
  volumesOptionsStore.activeInterval = interval;
  imageSource.value = API_ROUTES.volumesImage({
    interval,
    band,
    variable: volumesOptionsStore.activeVariable,
  });
}

watch(volumesOptionsStore, () => {
  if (volumesOptionsStore.activeBand === null || volumesOptionsStore.activeInterval === null) {
    return;
  }

  handleSelection(volumesOptionsStore.activeBand, volumesOptionsStore.activeInterval);
});
</script>

<template>
  <Title text="Volumes" />
  <VolumesOptions />
  <VolumesBoxPlot />
  <SelectionTable :callback="handleSelection" :xs="bands" :ys="intervals" />
  <SelectionImage v-if="imageSource" :source="imageSource" />
</template>
