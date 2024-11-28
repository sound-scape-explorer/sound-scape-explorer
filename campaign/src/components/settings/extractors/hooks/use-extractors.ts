import {useAtom} from 'jotai';
import {useCallback, useRef} from 'react';
import {extractorsAtom} from 'src/atoms.ts';
import {EXTRACTORS} from 'src/constants.ts';
import {type Extractor} from 'src/types.ts';
import {notifyError} from 'src/utils/notify-error.ts';

export function useExtractors() {
  const [extractors, setExtractors] = useAtom(extractorsAtom);

  const nameRef = useRef<HTMLSelectElement | null>(null);
  const offsetRef = useRef<HTMLInputElement | null>(null);
  const stepRef = useRef<HTMLInputElement | null>(null);
  const persistRef = useRef<HTMLInputElement | null>(null);

  const resetFields = useCallback(() => {
    if (nameRef.current !== null) {
      nameRef.current.value = EXTRACTORS[0];
    }

    if (offsetRef.current !== null) {
      offsetRef.current.value = '';
    }

    if (stepRef.current !== null) {
      stepRef.current.value = '';
    }

    if (persistRef.current !== null) {
      persistRef.current.checked = false;
    }
  }, []);

  const add = useCallback(() => {
    if (
      nameRef.current === null ||
      offsetRef.current === null ||
      stepRef.current === null ||
      persistRef.current === null
    ) {
      return;
    }

    const name = nameRef.current.value;
    const offset = Number(offsetRef.current.value);
    const step = Number(stepRef.current.value);
    const persist = persistRef.current.checked;

    const isUnique = extractors.filter((e) => e.name === name).length === 0;

    if (!isUnique) {
      notifyError('Extractor name already exists');
      return;
    }

    const newExtractor: Extractor = {
      name: name,
      offset: offset,
      step: step,
      persist: persist,
      isNeural: true,
    };

    const newExtractors = [...extractors, newExtractor];
    setExtractors(newExtractors);
    resetFields();
  }, [
    nameRef,
    offsetRef,
    stepRef,
    persistRef,
    extractors,
    setExtractors,
    resetFields,
  ]);

  const remove = useCallback(
    (extractor: Extractor) => {
      const newExtractors = extractors.filter((e) => e !== extractor);
      setExtractors(newExtractors);
    },
    [extractors, setExtractors],
  );

  return {
    nameRef,
    offsetRef,
    stepRef,
    persistRef,
    extractors,
    add,
    remove,
  };
}
