<script lang="ts" setup>
import {onUnmounted} from 'vue';
import CoveringExport from '../components/CoveringExport.vue';
import Selection from '../components/Selection.vue';
import Title from '../components/Title.vue';
import {useConfig} from '../composables/useConfig';
import {useSelection} from '../composables/useSelection';
import {API_ROUTES} from '../constants';
import {selectionImageStore} from '../store/selection-image.store';

const {bands, intervals} = await useConfig();
const {clearSelection} = useSelection();

const intervalsAsStrings = intervals.map((i) => i.toString());

function handleSelectionUpdate(band: string, interval: string) {
  if (!band || !interval) {
    return;
  }

  selectionImageStore.image = API_ROUTES.covering({
    integration: interval,
    band,
  });
}

onUnmounted(clearSelection);
</script>

<template>
  <Title text="Covering" />
  <div class="container">
    <CoveringExport />
    <Selection :bands="bands" :callback="handleSelectionUpdate" :integrations="intervalsAsStrings" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
