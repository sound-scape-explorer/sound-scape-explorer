<script lang="ts" setup>
import {computed, defineProps} from 'vue';
import {NButton, NDropdown} from 'naive-ui';
import {convertToNaiveDropdownOptions} from '../utils/convert-to-naive-dropdown-options';
import {volumesOptionsStore} from '../store/volumes-options.store';
import {useSelection} from '../composables/useSelection';

/**
 * Props
 */

interface Props {
  ranges: string[];
}

const {ranges} = defineProps<Props>();
const {isActive} = useSelection();

/**
 * State
 */

const options = computed(() => convertToNaiveDropdownOptions(ranges));
volumesOptionsStore.activeRange = ranges[0];

/**
 * Handlers
 */

function selectRange(nextRange: string) {
  volumesOptionsStore.activeRange = nextRange;
}
</script>

<template>
  <n-dropdown
      :disabled="!isActive"
      :options="options"
      placement="bottom-start"
      trigger="hover"
      @select="selectRange"
  >
    <n-button>{{ volumesOptionsStore.activeRange }}</n-button>
  </n-dropdown>
</template>
