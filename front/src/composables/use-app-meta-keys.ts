import {useMagicKeys} from '@vueuse/core';
import {useDraggables} from 'src/composables/use-draggables';
import {useKeyboard} from 'src/composables/use-keyboard';
import {onMounted, onUnmounted, watch} from 'vue';

const blockedKeys: KeyboardEvent['key'][] = ['Tab'];

export function useAppMetaKeys() {
  const {tab, escape} = useMagicKeys();
  const {cycle, closeActive} = useDraggables();
  const {isLocked} = useKeyboard();

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

    closeActive();
  };

  onMounted(() => document.addEventListener('keydown', blockHandler));
  onUnmounted(() => document.removeEventListener('keydown', blockHandler));
  watch(tab, handleTab);
  watch(escape, handleEscape);
}
