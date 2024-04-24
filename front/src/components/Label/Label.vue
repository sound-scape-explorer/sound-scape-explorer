<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {KeyboardShortcut} from 'src/common/KeyboardShortcut';
import {labelsColumnsRef} from 'src/components/Label/useLabelsColumns';
import {useKeyboard} from 'src/composables/keyboard';
import {computed} from 'vue';

import AppDraggable from '../AppDraggable/AppDraggable.vue';
import LabelItems from './LabelItems.vue';
import {useLabelsSelection} from './useLabelsSelection';
import {labelZoomedRef} from './useLabelZoomed';

useLabelsSelection();

const containerClasses = computed<string>(() => {
  let classes = 'container';

  if (labelZoomedRef.value === true) {
    classes += ' open';
  }

  return classes;
});

const toggleZoom = () => {
  labelZoomedRef.value = !labelZoomedRef.value;
};

const {registerKey} = useKeyboard();
registerKey(KeyboardShortcut.labelsZoom, toggleZoom);

const toggleColumns = () => {
  if (labelsColumnsRef.value === 1) {
    labelsColumnsRef.value = 2;
    return;
  }

  labelsColumnsRef.value = 1;
};
</script>

<template>
  <AppDraggable draggable-key="labels">
    <div
      :class="containerClasses"
      class="container"
    >
      <div class="button search">
        <n-tooltip placement="left">
          <template #trigger>
            <n-button
              size="tiny"
              @click="toggleZoom"
            >
              <n-icon>
                <search-outline />
              </n-icon>
            </n-button>
          </template>
          <span>Zoom</span>
        </n-tooltip>
      </div>

      <div class="button columns">
        <n-tooltip placement="left">
          <template #trigger>
            <n-button
              size="tiny"
              @click="toggleColumns"
            >
              <n-icon>{{ labelsColumnsRef.value }}</n-icon>
            </n-button>
          </template>
          <span>Columns</span>
        </n-tooltip>
      </div>

      <LabelItems />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 14rem;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: small;
  font-weight: bold;
  font-style: italic;
}

.open {
  height: 100%;
  max-height: 70vh;
}

.button {
  position: fixed;
  left: 0.5rem;
}

.button.search {
  top: 2.5rem;
}

.button.columns {
  top: 4.5rem;
}

.toggle {
  position: fixed;
  background: transparent;
  padding-right: 26px;
  width: auto;
}
</style>
