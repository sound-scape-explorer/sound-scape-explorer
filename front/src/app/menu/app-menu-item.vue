<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {useAppMenuItem} from 'src/app/menu/app-menu-item';
import {type DraggablesStore} from 'src/composables/draggables';

export interface AppMenuItemProps {
  draggableKey: keyof DraggablesStore;
  text: string;
  // eslint-disable-next-line no-unused-vars
  toggle: (key: keyof DraggablesStore) => void;
  disabled?: boolean;
}

const props = defineProps<AppMenuItemProps>();
const {button, handleClick, shortcut, classNames} = useAppMenuItem(props);
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
    <span
      >{{ props.text }} [<span class="bold">{{ shortcut }}</span
      >]</span
    >
  </NTooltip>
</template>

<style lang="scss" scoped>
.button {
  backdrop-filter: blur(5px);
  pointer-events: auto;
}

.active {
  background: rgba(23, 159, 87, 0.4);
}

.bold {
  font-weight: bold;
}
</style>
