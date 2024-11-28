import {type OverlayToaster} from '@blueprintjs/core';
import {atom, useAtom} from 'jotai';

const toasterAtom = atom<OverlayToaster | null>(null);

export function useToaster() {
  const [toaster, setToaster] = useAtom(toasterAtom);

  return {
    toaster,
    setToaster,
  };
}
