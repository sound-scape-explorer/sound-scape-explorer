import {REDUCER_DIMENSIONS_DEFAULT} from '@shared/constants.ts';
import {type ReducerDto} from '@shared/dtos.ts';
import {ReducerImplEnum} from '@shared/enums.ts';
import {useCallback, useMemo} from 'react';
import {
  type ExtractionConfigWithId,
  useExtractionState,
} from 'src/panels/extractions/hooks/use-extraction-state.ts';

export function useReducerState(extraction: ExtractionConfigWithId) {
  const {updateExtraction} = useExtractionState();

  const reducers = useMemo(() => extraction.reducers, [extraction.reducers]);

  const addReducer = useCallback(() => {
    extraction.reducers.push({
      index: extraction.reducers.length,
      impl: ReducerImplEnum.enum.UMAP,
      dimensions: REDUCER_DIMENSIONS_DEFAULT,
    });

    updateExtraction(extraction);
  }, [extraction, updateExtraction]);

  const deleteReducer = useCallback(
    (reducer: ReducerDto) => {
      const newReducers = extraction.reducers.filter(
        (r) => r.index !== reducer.index,
      );
      newReducers.forEach((r, index) => {
        r.index = index;
      });
      extraction.reducers = newReducers;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateIndex = useCallback(
    (reducer: ReducerDto, index: number) => {
      const newReducers = [...extraction.reducers];
      const newIndex = reducer.index + index;

      if (newIndex < 0 || newIndex >= extraction.reducers.length) {
        return;
      }

      const existing = newReducers.find((r) => r.index === newIndex);
      const updated = newReducers.find((r) => r.index === reducer.index);
      if (existing && updated) {
        existing.index = reducer.index;
        updated.index = newIndex;
      }

      extraction.reducers = newReducers;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateImpl = useCallback(
    (reducer: ReducerDto, impl: ReducerImplEnum) => {
      reducer.impl = impl;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateDimensions = useCallback(
    (reducer: ReducerDto, dimensions: number) => {
      reducer.dimensions = dimensions;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  return {
    reducers,
    addReducer,
    deleteReducer,
    updateIndex,
    updateImpl,
    updateDimensions,
  };
}
