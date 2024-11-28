import {useAtom} from 'jotai';
import {useCallback, useRef} from 'react';
import {bandsAtom} from 'src/atoms.ts';
import {type Band} from 'src/types.ts';
import {swapNext, swapPrevious} from 'src/utils/array.ts';
import {notifyError} from 'src/utils/notify-error.ts';

export function useBands() {
  const [bands, setBands] = useAtom(bandsAtom);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const lowRef = useRef<HTMLInputElement | null>(null);
  const highRef = useRef<HTMLInputElement | null>(null);

  const resetFields = useCallback(() => {
    if (nameRef.current !== null) {
      nameRef.current.value = '';
    }

    if (lowRef.current !== null) {
      lowRef.current.value = '';
    }

    if (highRef.current !== null) {
      highRef.current.value = '';
    }
  }, []);

  const add = useCallback(() => {
    if (
      nameRef.current === null ||
      lowRef.current === null ||
      highRef.current === null
    ) {
      return;
    }

    const name = nameRef.current.value;
    const low = Number(lowRef.current.value);
    const high = Number(highRef.current.value);

    const isUniqueName =
      bands.filter((band) => band.name === name).length === 0;

    if (!isUniqueName) {
      notifyError('Band name already exists');
      return;
    }

    if (high <= low) {
      notifyError('High frequency is below low frequency');
      return;
    }

    const newBand: Band = {
      name: name,
      low: low,
      high: high,
    };

    const newBands = [...bands, newBand];
    setBands(newBands);
    resetFields();
  }, [nameRef, lowRef, highRef, bands, setBands, resetFields]);

  const remove = useCallback(
    (band: Band) => {
      const newBands = bands.filter((b) => b !== band);
      setBands(newBands);
    },
    [bands, setBands],
  );

  const moveUp = useCallback(
    (band: Band) => {
      const i = bands.indexOf(band);

      if (i <= 0) {
        return;
      }

      const newBands = [...bands];
      swapPrevious(newBands, i);
      setBands(newBands);
    },
    [bands, setBands],
  );

  const moveDown = useCallback(
    (band: Band) => {
      const i = bands.indexOf(band);

      if (i >= bands.length - 1) {
        return;
      }

      const newBands = [...bands];
      swapNext(newBands, i);
      setBands(newBands);
    },
    [bands, setBands],
  );

  return {
    nameRef,
    lowRef,
    highRef,
    bands,
    add,
    remove,
    moveUp,
    moveDown,
  };
}
