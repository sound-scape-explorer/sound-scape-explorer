import {NButton} from 'naive-ui';
import type {AppMenuItemProps} from 'src/app/menu/app-menu-button.vue';
import {useDraggables} from 'src/composables/use-draggables';
import {computed, ref} from 'vue';

export function useAppMenuButton(props: AppMenuItemProps) {
  const {store, toggle, hidden} = useDraggables();

  const button = ref<typeof NButton | null>(null);

  const handleClick = () => {
    if (button.value === null) {
      return;
    }

    toggle(props.draggableKey);
    button.value.$el.blur();
  };

  const classNames = computed<string>(() => {
    let string = 'app-menu-button';

    if (store[props.draggableKey]) {
      string += ' app-menu-button__active';
    }

    if (hidden.value) {
      string += ' hidden';
    }

    return string;
  });

  return {
    button: button,
    handleClick: handleClick,
    classNames: classNames,
  };
}
