import {atom, useAtom, useSetAtom} from 'jotai';
import {useCallback, useEffect, useRef} from 'react';

export const tableRefAtom = atom<HTMLDivElement | null>(null);
export const triggerHelpModalAtom = atom<(() => void) | null>(null);

export function useTableRefProvider() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [savedRef, setSavedRef] = useAtom(tableRefAtom);
  const setTriggerHelpModal = useSetAtom(triggerHelpModalAtom);

  const triggerHelpModal = useCallback(() => {
    if (!savedRef) {
      return;
    }

    const event = new KeyboardEvent('keydown', {
      key: '?',
      code: 'Slash',
      // keyCode: 191,
      // which: 191,
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });

    savedRef.dispatchEvent(event);
  }, [savedRef]);

  useEffect(() => {
    setSavedRef(tableRef.current);
    setTriggerHelpModal(() => triggerHelpModal);
  }, [setSavedRef, setTriggerHelpModal, triggerHelpModal]);

  return {
    tableRef,
    triggerHelpModal,
  };
}
