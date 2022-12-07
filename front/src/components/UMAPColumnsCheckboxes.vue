<script lang="ts" setup="">
import {defineProps, ref, watch} from 'vue';
import {NCheckbox, NCheckboxGroup} from 'naive-ui';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';
import {useUMAPStatus} from '../composables/useUMAPStatus';

/**
 * Props
 */

interface Props {
  title: string;
  items: string[];
}

const {title, items} = defineProps<Props>();

/**
 * State
 */

const selection = ref(null);
const {columns} = UMAPColumnsStore;
const {isDisabled} = useUMAPStatus();

/**
 * Handlers
 */

function updateSelection() {
  if (selection.value === null) {
    return;
  }

  if (typeof columns[title] === 'undefined') {
    // @ts-expect-error TS2740
    columns[title] = {};
  }

  columns[title] = selection.value;
}

/**
 * Lifecycles
 */

watch(selection, () => {
  updateSelection();
});
</script>

<template>
  <n-checkbox-group v-model:value="selection" :disabled="isDisabled" class="checkboxes">
    <n-checkbox v-for="item in items" :value="item">
      {{ item }}
    </n-checkbox>
  </n-checkbox-group>
</template>

<style lang="scss" scoped>
.checkboxes {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}
</style>
