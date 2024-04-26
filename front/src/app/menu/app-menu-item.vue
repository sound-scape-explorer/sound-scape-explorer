<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {KeyboardShortcut} from 'src/common/keyboard-shortcuts';
import {type DraggablesStore, useDraggables} from 'src/composables/draggables';
import {computed, ref} from 'vue';

const {store} = useDraggables();

interface Props {
  draggableKey: keyof DraggablesStore;
  text: string;
  // eslint-disable-next-line no-unused-vars
  toggle: (key: keyof DraggablesStore) => void;
  disabled?: boolean;
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

  if (store[props.draggableKey]) {
    classes += ' active';
  }

  return classes;
});
</script>

<template>
  <NTooltip
    placement="right"
    trigger="hover"
  >
    <template #trigger>
      <NButton
        ref="buttonRef"
        :class="classesRef"
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
      >{{ props.text }} [<span class="bold">{{ shortcutRef }}</span
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
