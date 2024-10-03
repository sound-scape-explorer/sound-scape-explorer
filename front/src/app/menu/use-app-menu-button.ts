import {NButton} from 'naive-ui';
import {type AppMenuItemProps} from 'src/app/menu/app-menu-button.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDraggables} from 'src/composables/use-draggables';
import {computed, ref} from 'vue';

export function useAppMenuButton(props: AppMenuItemProps) {
  const {store, toggle, hidden, selected} = useDraggables();
  const {isHidingMenuOnDraggableToggle} = useClientSettings();

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
    const isActive = store[props.draggableKey];
    const isSelected = selected.value === props.draggableKey;

    if (isActive) {
      string += ' app-menu-button__active';
    }

    if (isActive && isSelected) {
      string += ' app-menu-button__selected';
    }

    if (hidden.value && isHidingMenuOnDraggableToggle.value) {
      string += ' app-menu-button__hidden';
    }

    return string;
  });

  return {
    button: button,
    handleClick: handleClick,
    classNames: classNames,
  };
}
