import {type Region} from '@blueprintjs/table';
import {atom, useAtom} from 'jotai';
import {useCallback} from 'react';

interface Selection {
  cols: [number, number]; // start, end
  rows: [number, number]; // start, end
}

const selectionAtom = atom<Selection>({cols: [0, 0], rows: [0, 0]});

export function useTableCurrentSelection() {
  const [selection, setSelection] = useAtom(selectionAtom);

  const handleSelection = useCallback(
    (regions: Region[]) => {
      const region = regions[0];
      setSelection(region as Selection);
    },
    [setSelection],
  );

  return {
    selection,
    handleSelection,
  };
}
