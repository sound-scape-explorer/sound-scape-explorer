<script lang="ts" setup>
import {computed, defineProps} from 'vue';
import {NSelect} from 'naive-ui';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';
import {volumesOptionsStore} from '../store/volumes-options.store';

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
volumesOptionsStore.activeSites = [sites[0]];

/**
 * Handlers
 */

function selectSite(nextSites: string[]) {
  volumesOptionsStore.activeSites = nextSites;
}
</script>

<template>
  <n-select
      v-model:value="volumesOptionsStore.activeSites"
      :options="options"
      filterable
      multiple
      @update:value="selectSite"
  />
</template>
