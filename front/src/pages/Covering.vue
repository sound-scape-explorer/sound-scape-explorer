<script lang="ts" setup>
import {onUnmounted} from 'vue';
import CoveringExport from '../components/CoveringExport.vue';
import Selection from '../components/Selection.vue';
import Title from '../components/Title.vue';
import {useSelection} from '../composables/useSelection';
import {useStorage} from '../composables/useStorage';

const {
  getBands,
  getIntegrations,
} = await useStorage();

const bands = await getBands();
const integrations = await getIntegrations();

const {clearSelection} = useSelection();
onUnmounted(clearSelection);

function handleSelectionChange(band: string, integration: string) {
  console.log({band, integration});
}
</script>

<template>
  <Title text="Covering" />
  <div class="container">
    <CoveringExport />
    <Selection :bands="Object.keys(bands)" :callback="handleSelectionChange" :integrations="integrations" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
