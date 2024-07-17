<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {useAppMenuButton} from 'src/app/menu/use-app-menu-button';
import {type DraggableKey} from 'src/composables/use-draggables';
import {useKeyboardShortcuts} from 'src/composables/use-shortcuts';

export interface AppMenuItemProps {
  draggableKey: DraggableKey;
  text: string;
  disabled?: boolean;
}

const props = defineProps<AppMenuItemProps>();
const {button, handleClick, classNames} = useAppMenuButton(props);
const {getKey} = useKeyboardShortcuts();
</script>

<template>
  <NTooltip
    placement="right"
    trigger="hover"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <NButton
        ref="button"
        :class="classNames"
        :disabled="props.disabled"
        size="small"
        @click="handleClick"
      >
        <NIcon>
          <slot />
        </NIcon>
      </NButton>
    </template>

    <div>
      {{ props.text }} [<span class="app-menu-button__bold">
        {{ getKey(props.draggableKey) }}</span
      >]
    </div>
  </NTooltip>
</template>

<style lang="scss">
.app-menu-button {
  backdrop-filter: blur(5px);
  pointer-events: auto;
}

.app-menu-button__active {
  background: $oliveLight;
}

.app-menu-button__bold {
  font-weight: bold;
}

.app-menu-button__selected {
  background: $olive;
}

.app-menu-button__hidden {
  display: none;
}
</style>
