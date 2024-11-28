import {useAtom} from 'jotai';
import {useCallback, useMemo, useRef} from 'react';
import {bandsAtom} from 'src/atoms.ts';
import {
  ConfigTemplate,
  useConfigTemplatesOld,
} from 'src/hooks/use-config-templates-old.ts';
import {type Band} from 'src/types.ts';
import {swapNext, swapPrevious} from 'src/utils/array.ts';
import {notifyError} from 'src/utils/notifications.ts';

export function useBands() {
  const [bands, setBands] = useAtom(bandsAtom);
  const {template} = useConfigTemplatesOld();

  const actualBands = useMemo(() => {
    if (template === ConfigTemplate.coralReef) {
      return [{name: 'fish', low: 70, high: 2000}];
    }

    return bands;
  }, [bands, template]);

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

    if (name === '') {
      notifyError('Band name is empty');
      return;
    }

    const existing = bands.find((b) => b.name === name);

    if (existing) {
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
    bands: actualBands,
    add,
    remove,
    moveUp,
    moveDown,
  };
}
