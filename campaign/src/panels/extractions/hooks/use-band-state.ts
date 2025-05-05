import {type BandDto} from '@shared/dtos.ts';
import {useCallback, useMemo} from 'react';
import {
  type ExtractionConfigWithId,
  useExtractionState,
} from 'src/panels/extractions/hooks/use-extraction-state.ts';

export function useBandState(extraction: ExtractionConfigWithId) {
  const {updateExtraction} = useExtractionState();

  const bands = useMemo(() => extraction.bands, [extraction.bands]);

  const addBand = useCallback(() => {
    extraction.bands.push({
      index: extraction.bands.length,
      name: '',
      low: 0,
      high: 20000,
    });

    updateExtraction(extraction);
  }, [extraction, updateExtraction]);

  const deleteBand = useCallback(
    (band: BandDto) => {
      const newBands = extraction.bands.filter((b) => b.index !== band.index);
      newBands.forEach((b, index) => {
        b.index = index;
      });
      extraction.bands = newBands;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateIndex = useCallback(
    (band: BandDto, index: number) => {
      const newBands = [...extraction.bands];
      const newIndex = band.index + index;

      if (newIndex < 0 || newIndex >= extraction.bands.length) {
        return;
      }

      const existing = newBands.find((b) => b.index === newIndex);
      const updated = newBands.find((b) => b.index === band.index);
      if (existing && updated) {
        existing.index = band.index;
        updated.index = newIndex;
      }

      extraction.bands = newBands;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateName = useCallback(
    (band: BandDto, name: string) => {
      band.name = name;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateLow = useCallback(
    (band: BandDto, low: number) => {
      band.low = low;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateHigh = useCallback(
    (band: BandDto, high: number) => {
      band.high = high;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  return {
    bands,
    addBand,
    deleteBand,
    updateIndex,
    updateName,
    updateLow,
    updateHigh,
  };
}
