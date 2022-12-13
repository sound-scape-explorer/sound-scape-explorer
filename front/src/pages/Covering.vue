<script lang="ts" setup>
import {useConfig} from '../composables/useConfig';
import {API_ROUTES} from '../constants';
import Title from '../components/Title.vue';
import CoveringExport from '../components/CoveringExport.vue';
import {selectionImageStore} from '../store/selection-image.store';
import {onUnmounted} from 'vue';
import {useSelection} from '../composables/useSelection';
import Selection from '../components/Selection.vue';

const {bands, intervals} = await useConfig();
const {clearSelection} = useSelection();

function setImage(x: string, y: string) {
  if (!x || !y) {
    return;
  }

  selectionImageStore.image = API_ROUTES.covering({
    interval: y,
    band: x,
  });
}

onUnmounted(clearSelection);
</script>

<template>
  <Title text="Covering" />
  <div class="container">
    <CoveringExport />
    <Selection :bands="bands" :callback="setImage" :intervals="intervals?.map(i => i.toString())" class="selection" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selection {
  flex-direction: row;
  flex: 1;
}
</style>
