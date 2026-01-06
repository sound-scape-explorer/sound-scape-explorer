import {NButton} from 'naive-ui';
import {type AppMenuItemProps} from 'src/app/menu/app-menu-button.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDraggables} from 'src/composables/use-draggables';
import {computed, ref} from 'vue';

export function useAppMenuButton(props: AppMenuItemProps) {
  const {store, toggle, hidden, stack} = useDraggables();
  const {isHidingMenuOnDraggableToggle} = useClientSettings();
  const button = ref<typeof NButton | null>(null);

  const isActive = computed(() => store[props.draggableKey]);

  const isSelected = computed(
    () => isActive && stack.value[0] === props.draggableKey,
  );

  const isHidden = computed(
    () => hidden.value && isHidingMenuOnDraggableToggle.value,
  );

  const handleClick = () => {
    if (button.value === null) {
      return;
    }

    toggle(props.draggableKey);
    button.value.$el.blur();
  };

  return {
    button,
    handleClick,
    isActive,
    isSelected,
    isHidden,
  };
}
