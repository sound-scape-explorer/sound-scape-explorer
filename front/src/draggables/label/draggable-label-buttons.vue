<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {KeyboardShortcut} from 'src/common/keyboard-shortcuts';
import {useKeyboard} from 'src/composables/keyboard';
import {labelZoomedRef} from 'src/draggables/label/label-zoom';
import {labelColumnsRef} from 'src/draggables/label/labels-columns';

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
  <div class="button search">
    <NTooltip placement="left">
      <!--suppress VueUnrecognizedSlot -->
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
      <!--suppress VueUnrecognizedSlot -->
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
</template>

<style lang="scss" scoped>
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
</style>
