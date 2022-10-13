<script lang="ts" setup>
import {computed, defineProps} from 'vue';
import {NSelect} from 'naive-ui';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';
import {selectionStore} from '../store/selection.store';

/**
 * Props
 */

interface Props {
  sites: string[];
}

const {sites} = defineProps<Props>();

/**
 * State
 */

const options = computed(() => convertToNaiveSelectOptions(sites));
selectionStore.activeSites = [sites[0]];

/**
 * Handlers
 */

function selectSite(nextSites: string[]) {
  selectionStore.activeSites = nextSites;
}
</script>

<template>
  <n-select
      v-model:value="selectionStore.activeSites"
      :options="options"
      filterable
      multiple
      @update:value="selectSite"
  />
</template>
