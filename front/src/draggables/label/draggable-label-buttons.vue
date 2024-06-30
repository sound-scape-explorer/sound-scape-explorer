<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {KeyboardShortcut} from 'src/common/keyboard-shortcuts';
import {useKeyboard} from 'src/composables/use-keyboard';
import {useDraggableLabel} from 'src/draggables/label/use-draggable-label';

const {registerKey} = useKeyboard();
const {columns, toggleColumns, toggleZoom} = useDraggableLabel();

registerKey(KeyboardShortcut.labelsZoom, toggleZoom);
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
          <NIcon>{{ columns }}</NIcon>
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
