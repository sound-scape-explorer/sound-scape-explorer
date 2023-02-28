<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {selectionStore} from 'src/store/selection.store';
import {computed, defineProps, watch} from 'vue';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';

interface Props {
  bands: string[];
  integrations: string[];
  // eslint-disable-next-line no-unused-vars
  handleUpdate: (band: string, integration: string) => void;
}

const {bands, integrations, handleUpdate} = defineProps<Props>();

const bandsOptions = computed(() => convertToNaiveSelectOptions(bands));
const integrationsOptions = computed(() => convertToNaiveSelectOptions(integrations));

function processSelection() {
  if (
      selectionStore.band === null
      || selectionStore.umapName === null
  ) {
    return;
  }

  handleUpdate(selectionStore.band, selectionStore.umapName);
}

watch(selectionStore, processSelection);
</script>

<template>
  <n-select
      v-model:value="selectionStore.band"
      :options="bandsOptions"
      placeholder="Bands..."
      size="tiny"
  />
  <n-select
      v-model:value="selectionStore.umapName"
      :options="integrationsOptions"
      placeholder="Intervals..."
      size="tiny"
  />
</template>
