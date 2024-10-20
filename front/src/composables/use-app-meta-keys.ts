import {useMagicKeys} from '@vueuse/core';
import {useDraggables} from 'src/composables/use-draggables';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {Shortcuts} from 'src/composables/use-shortcuts';
import {onMounted, onUnmounted, watch} from 'vue';

const blockedKeys: KeyboardEvent['key'][] = ['Tab']; // prevent default behaviours

export function useAppMetaKeys() {
  const {tab, escape, shift} = useMagicKeys();
  const {cycle, closeActive, toggleAll} = useDraggables();
  const {isLocked, registerKey} = useGlobalKeyboard();

  registerKey(Shortcuts.draggableClose, closeActive);

  const blockHandler = (e: KeyboardEvent) => {
    if (blockedKeys.indexOf(e.key) === -1) {
      return;
    }

    e.preventDefault();
  };

  const handleTab = () => {
    if (isLocked.value || !tab.value) {
      return;
    }

    cycle(shift.value);
  };

  const handleEscape = () => {
    if (!escape.value) {
      return;
    }

    toggleAll();
  };

  onMounted(() => document.addEventListener('keydown', blockHandler));
  onUnmounted(() => document.removeEventListener('keydown', blockHandler));
  watch(tab, handleTab);
  watch(escape, handleEscape);
}
