import {atom, useAtom} from 'jotai';
import {useCallback} from 'react';

export type TabIndex =
  | 'import'
  | 'files'
  | 'settings'
  | 'config'
  | 'metrics'
  | 'export';

const tabIndexAtom = atom<TabIndex>('import');

export function useTabNavigation() {
  const [index, setIndex] = useAtom<TabIndex>(tabIndexAtom);

  const navigate = useCallback(
    (id: TabIndex) => {
      setIndex(id);
    },
    [setIndex],
  );

  return {
    index,
    setIndex,
    navigate,
  };
}
