import {atom, useAtom} from 'jotai';
import {useCallback} from 'react';
import {isDarkModeEnabled} from 'src/utils/browser.ts';

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
