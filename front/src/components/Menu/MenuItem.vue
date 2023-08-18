<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {KeyboardShortcut} from 'src/common/KeyboardShortcut';
import {computed, ref} from 'vue';

import {
  type AppDraggablesStore,
  appDraggablesStore,
} from '../AppDraggable/appDraggablesStore';

interface Props {
  draggableKey: keyof AppDraggablesStore;
  text: string;
  // eslint-disable-next-line no-unused-vars
  toggle: (key: keyof AppDraggablesStore) => void;
}

const props = defineProps<Props>();

const buttonRef = ref<typeof NButton | null>(null);

const handleClick = () => {
  if (buttonRef.value === null) {
    return;
  }

  props.toggle(props.draggableKey);
  buttonRef.value.$el.blur();
};

const shortcutRef = computed<string>(() => {
  return KeyboardShortcut[props.draggableKey];
});

const classesRef = computed<string>(() => {
  let classes = 'button';

  if (appDraggablesStore[props.draggableKey] === true) {
    classes += ' active';
  }

  return classes;
});
</script>

<template>
  <n-tooltip
    placement="right"
    trigger="hover"
  >
    <template #trigger>
      <n-button
        ref="buttonRef"
        :class="classesRef"
        size="small"
        @click="handleClick"
      >
        <n-icon>
          <slot />
        </n-icon>
      </n-button>
    </template>
    <span
      >{{ props.text }} [<span class="bold">{{ shortcutRef }}</span
      >]</span
    >
  </n-tooltip>
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
