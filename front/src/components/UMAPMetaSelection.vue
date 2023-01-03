<script lang="ts" setup="">
import {defineProps, ref, watch} from 'vue';
import {NCheckbox, NCheckboxGroup} from 'naive-ui';
import {UMAPMetaStore} from '../store/UMAP-meta.store';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {useUMAPMeta} from '../composables/useUMAPMeta';
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
const {metaSelection} = UMAPMetaStore;
const {isDisabled} = useUMAPStatus();

function getColorByItem(index: number): string | undefined {
  const {getMetaColorFromMetaIndex} = useUMAPMeta();
  const colorType = `by${title}`;

  if (colorType !== UMAPFiltersStore.colorType) {
    return undefined;
  }

  return getMetaColorFromMetaIndex(index, items.length);
}

/**
 * Handlers
 */

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
        :style="{background: getColorByItem(index)}"
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
