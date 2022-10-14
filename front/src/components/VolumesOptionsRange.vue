<script lang="ts" setup>
import {computed, defineProps} from 'vue';
import {NButton, NDropdown} from 'naive-ui';
import {convertToNaiveDropdownOptions} from '../utils/convert-to-naive-dropdown-options';
import {selectionStore} from '../store/selection.store';

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
selectionStore.activeRange = ranges[0];

/**
 * Handlers
 */

function selectRange(nextRange: string) {
  selectionStore.activeRange = nextRange;
}
</script>

<template>
  <n-dropdown
      :options="options"
      placement="bottom-start"
      trigger="hover"
      @select="selectRange"
  >
    <n-button>{{ selectionStore.activeRange }}</n-button>
  </n-dropdown>
</template>
