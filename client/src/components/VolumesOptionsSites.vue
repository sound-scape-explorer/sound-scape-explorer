<script lang="ts" setup>
import {computed, defineProps} from 'vue';
import {NSelect} from 'naive-ui';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';
import {volumesStore} from '../store/volumes.store';

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
volumesStore.activeSites = [sites[0]];

/**
 * Handlers
 */

function selectSite(nextSites: string[]) {
  volumesStore.activeSites = nextSites;
}
</script>

<template>
  <n-select
      v-model:value="volumesStore.activeSites"
      :options="options"
      filterable
      multiple
      @update:value="selectSite"
  />
</template>
