import {useCallback, useRef} from 'react';
import {type ExtractorReducerPickerProps} from 'src/components/settings/extractors/extractor-reducer-picker.tsx';
import {REDUCER_NONE} from 'src/constants.ts';
import {type Reducer} from 'src/types.ts';

export function useExtractorReducerPicker({
  extractor,
}: ExtractorReducerPickerProps) {
  const nameRef = useRef<HTMLSelectElement | null>(null);
  const dimensionsRef = useRef<HTMLInputElement | null>(null);

  const reset = useCallback(() => {
    if (typeof extractor.reducer === 'undefined') {
      return;
    }

    delete extractor.reducer;
  }, [extractor]);

  const update = useCallback(() => {
    if (nameRef.current === null || dimensionsRef.current === null) {
      return;
    }

    const name = nameRef.current.value;
    const dimensions = Number(dimensionsRef.current.value);

    if (name === REDUCER_NONE || dimensions === 0) {
      reset();
      return;
    }

    const reducer: Reducer = {
      name: name,
      dimensions: dimensions,
    };

    extractor.reducer = reducer;
  }, [nameRef, dimensionsRef, extractor, reset]);

  return {
    nameRef,
    dimensionsRef,
    update,
  };
}
