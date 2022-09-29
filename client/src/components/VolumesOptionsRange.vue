<script lang="ts" setup>
import {computed, defineProps} from 'vue';
import {NButton, NDropdown} from 'naive-ui';
import {convertToNaiveDropdownOptions} from '../utils/convert-to-naive-dropdown-options';
import {volumesStore} from '../store/volumes.store';

/**
 * Props
 */

interface Props {
  ranges: string[];
}

const {ranges} = defineProps<Props>();

/**
 * State
 */

const options = computed(() => convertToNaiveDropdownOptions(ranges));
volumesStore.activeRange = ranges[0];

/**
 * Handlers
 */

function selectRange(nextRange: string) {
  volumesStore.activeRange = nextRange;
}
</script>

<template>
  <n-dropdown
      :options="options"
      placement="bottom-start"
      trigger="hover"
      @select="selectRange"
  >
    <n-button>{{ volumesStore.activeRange }}</n-button>
  </n-dropdown>
</template>
