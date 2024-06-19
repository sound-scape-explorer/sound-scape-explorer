import {NButton} from 'naive-ui';
import type {AppMenuItemProps} from 'src/app/menu/app-menu-button.vue';
import {KeyboardShortcut} from 'src/common/keyboard-shortcuts';
import {useDraggables} from 'src/composables/draggables';
import {computed, ref} from 'vue';

export function useAppMenuButton(props: AppMenuItemProps) {
  const {store} = useDraggables();

  const button = ref<typeof NButton | null>(null);

  const handleClick = () => {
    if (button.value === null) {
      return;
    }

    props.toggle(props.draggableKey);
    button.value.$el.blur();
  };

  const shortcut = computed<string>(() => {
    return KeyboardShortcut[props.draggableKey];
  });

  const classNames = computed<string>(() => {
    let string = 'app-menu-button';

    if (store[props.draggableKey]) {
      string += ' app-menu-button__active';
    }

    return string;
  });

  return {
    button: button,
    handleClick: handleClick,
    shortcut: shortcut,
    classNames: classNames,
  };
}
