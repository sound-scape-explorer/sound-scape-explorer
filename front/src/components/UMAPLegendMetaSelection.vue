<script lang="ts" setup="">
import {NCheckbox, NCheckboxGroup} from 'naive-ui';
import {ref, watch} from 'vue';
import {useUMAPMeta} from '../composables/useUMAPMeta';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {UMAPMetaStore} from '../store/UMAP-meta.store';

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
const {metaSelection} = UMAPMetaStore;
const {isDisabled} = useUMAPStatus();

/**
 * Handlers
 */

function getColorByItem(index: number): string | undefined {
  const {getMetaColorFromMetaIndex} = useUMAPMeta();
  const colorType = `by${title}`;

  if (colorType !== UMAPFiltersStore.colorType) {
    return undefined;
  }

  return getMetaColorFromMetaIndex(index, items.length);
}

function updateSelection() {
  if (selection.value === null) {
    return;
  }

  if (typeof metaSelection[index] === 'undefined') {
    // @ts-expect-error TS2740
    metaSelection[index] = {};
  }

  metaSelection[index] = selection.value;
}

/**
 * Lifecycles
 */

watch(selection, updateSelection);
</script>

<template>
  <n-checkbox-group v-model:value="selection" :disabled="isDisabled" class="checkboxes">
    <n-checkbox
        v-for="(item, index) in items"
        :style="{
          backgroundColor: getColorByItem(index)
        }"
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
  padding-left: 0.8rem;
  gap: 0.2rem 1rem;
}

.checkbox {
  padding-left: 0.2rem;
  border-radius: 0.2rem;

  transition: background-color 120ms ease-in-out, opacity 120ms ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.9;
  }
}
</style>
