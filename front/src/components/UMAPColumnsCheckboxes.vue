<script lang="ts" setup="">
import {defineProps, ref, watch} from 'vue';
import {NCheckbox, NCheckboxGroup} from 'naive-ui';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {useUMAPColumns} from '../composables/useUMAPColumns';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';

/**
 * Props
 */

interface Props {
  title: string;
  items: string[];
  index: number;
}

const {title, items, index} = defineProps<Props>();

/**
 * State
 */

const selection = ref(null);
const {columns} = UMAPColumnsStore;
const {isDisabled} = useUMAPStatus();

function getColorByItem(itemIndex: number): string | undefined {
  const {getColumnColor} = useUMAPColumns();
  const colorType = `by${title}`;

  if (colorType !== UMAPFiltersStore.colorType) {
    return undefined;
  }

  return getColumnColor(colorType, itemIndex, items.length);
}

/**
 * Handlers
 */

function updateSelection() {
  if (selection.value === null) {
    return;
  }

  if (typeof columns[index] === 'undefined') {
    // @ts-expect-error TS2740
    columns[index] = {};
  }

  columns[index] = selection.value;
}

/**
 * Lifecycles
 */

watch(selection, updateSelection);
</script>

<template>
  <n-checkbox-group v-model:value="selection" :disabled="isDisabled" class="checkboxes">
    <n-checkbox
        v-for="(item, itemIndex) in items"
        :style="{background: getColorByItem(itemIndex)}"
        :value="item"
        class="checkbox"
    >
      {{ item }}
    </n-checkbox>
  </n-checkbox-group>
</template>

<style lang="scss" scoped>
.checkboxes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-left: 0.8rem;
  gap: 0.2rem 1rem;
}

.checkbox {
  padding-left: 0.2rem;
  border-radius: 0.2rem;
}
</style>
