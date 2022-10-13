<script lang="ts" setup>
import {computed, ref} from 'vue';
import {NButton, NCheckbox, NDropdown, NP} from 'naive-ui';
import {convertToNaiveDropdownOptions} from '../utils/convert-to-naive-dropdown-options';
import type {AggregatesInterface} from '../interfaces/aggregates.interface';
import {selectionStore} from '../store/selection.store';

/**
 * State
 */

const aggregates: AggregatesInterface = {
  '1 h': 3600,
  '30 min': 1800,
  '15 min': 900,
  '5 min': 300,
  'as points': 1,
  '2 h': 7200,
};

const isEnabled = ref<boolean>(true);
const options = computed(() => convertToNaiveDropdownOptions(Object.keys(aggregates)));
const activeAggregate = ref<string>(Object.keys(aggregates)[0]);

// const activeAggregateSeconds = ref<number>(aggregates[activeAggregate.value]);

/**
 * Handlers
 */

function updateStatus(nextEnable: boolean) {
  isEnabled.value = nextEnable;
}

function selectAggregate(nextKey: string) {
  activeAggregate.value = nextKey;
  // activeAggregateSeconds.value = aggregates[nextKey];
  selectionStore.activeAggregate = aggregates[nextKey];
}

</script>

<template>
  <n-checkbox
      v-model:checked="isEnabled"
      label="Aggregate"
      @update:checked="updateStatus"
  />

  <n-dropdown
      v-if="isEnabled"
      :options="options"
      placement="bottom-start"
      trigger="hover"
      @select="selectAggregate"
  >
    <n-button>{{ activeAggregate }}</n-button>
  </n-dropdown>

  <n-p
      v-if="isEnabled"
      class="tooltip"
  >
    {{ selectionStore.activeAggregate }} s
  </n-p>
</template>

<style lang="scss" scoped>
.tooltip {
  font-style: italic;
  font-size: 0.8rem;
}
</style>
