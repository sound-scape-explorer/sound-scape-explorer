import {isDarkModeEnabled} from '@shared/browser';
import {atom, useAtom} from 'jotai';
import {useCallback} from 'react';

const isDarkAtom = atom<boolean>(isDarkModeEnabled());

export function useTheme() {
  const [isDark, setIsDark] = useAtom(isDarkAtom);

  const toggle = useCallback(() => {
    setIsDark((d) => !d);
  }, [setIsDark]);

  return {
    isDark,
    toggle,
  };
}
