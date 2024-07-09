import {useMagicKeys} from '@vueuse/core';
import {useDraggables} from 'src/composables/use-draggables';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {Shortcuts} from 'src/composables/use-shortcuts';
import {onMounted, onUnmounted, watch} from 'vue';

const blockedKeys: KeyboardEvent['key'][] = ['Tab'];

export function useAppMetaKeys() {
  const {tab, escape} = useMagicKeys();
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

    cycle();
  };

  const handleEscape = () => {
    if (!escape.value) {
      return;
    }

    // closeActive();
    toggleAll();
  };

  onMounted(() => document.addEventListener('keydown', blockHandler));
  onUnmounted(() => document.removeEventListener('keydown', blockHandler));
  watch(tab, handleTab);
  watch(escape, handleEscape);
}
