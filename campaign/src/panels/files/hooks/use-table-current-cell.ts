import {type FocusedCellCoordinates} from '@blueprintjs/table';
import {atom, useAtom} from 'jotai';
import {useCallback} from 'react';

interface Coords {
  row: number;
  col: number;
}

const coordsAtom = atom<Coords>({row: 0, col: 0});

export function useTableCurrentCell() {
  const [coords, setCoords] = useAtom(coordsAtom);

  const handleFocus = useCallback(
    (focus: FocusedCellCoordinates) => {
      const {row, col} = focus;
      setCoords({row, col});
    },
    [setCoords],
  );

  return {
    coords,
    handleFocus,
  };
}
