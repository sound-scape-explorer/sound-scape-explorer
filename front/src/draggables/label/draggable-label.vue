<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NTooltip} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {KeyboardShortcut} from 'src/common/keyboard-shortcuts';
import {useKeyboard} from 'src/composables/keyboard';
import LabelItems from 'src/draggables/label/draggable-label-headers.vue';
import {useLabelSelection} from 'src/draggables/label/label-selection';
import {labelZoomedRef} from 'src/draggables/label/label-zoom';
import {labelColumnsRef} from 'src/draggables/label/labels-columns';
import {computed} from 'vue';

useLabelSelection();

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
  if (labelColumnsRef.value === 1) {
    labelColumnsRef.value = 2;
    return;
  }

  labelColumnsRef.value = 1;
};
</script>

<template>
  <AppDraggable draggable-key="labels">
    <div
      :class="containerClasses"
      class="container"
    >
      <div class="button search">
        <NTooltip placement="left">
          <template #trigger>
            <NButton
              size="tiny"
              @click="toggleZoom"
            >
              <NIcon>
                <SearchOutline />
              </NIcon>
            </NButton>
          </template>
          <span>Zoom</span>
        </NTooltip>
      </div>

      <div class="button columns">
        <NTooltip placement="left">
          <template #trigger>
            <NButton
              size="tiny"
              @click="toggleColumns"
            >
              <NIcon>{{ labelColumnsRef.value }}</NIcon>
            </NButton>
          </template>
          <span>Columns</span>
        </NTooltip>
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
