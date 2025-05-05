import {type BandDto, type ExtractionDto} from '@shared/dtos';
import {useCallback} from 'react';
import {createDefaultValidation} from 'src/utils/validation';

export function useBandValidation() {
  const isNameValid = useCallback(
    (band: BandDto, extraction: ExtractionDto) => {
      if (band.name === '') {
        return false;
      }

      const names = extraction.bands
        .filter((b) => b.index !== band.index)
        .map((b) => b.name);

      // noinspection RedundantIfStatementJS
      if (names.includes(band.name)) {
        return false;
      }

      return true;
    },
    [],
  );

  const isLowValid = useCallback((band: BandDto) => band.low < band.high, []);
  const isHighValid = useCallback((band: BandDto) => band.high > band.low, []);

  const validate = useCallback(
    (extraction: ExtractionDto) => {
      const v = createDefaultValidation();
      const l = extraction.bands.length;
      v.intent = l > 0 ? 'success' : 'primary';
      v.content = `${l} ${l > 1 ? 'bands' : 'band'}`;

      if (l === 0) {
        v.intent = 'danger';
        v.content = 'empty';
        return v;
      }

      for (const band of extraction.bands) {
        if (!isNameValid(band, extraction)) {
          v.intent = 'warning';
          v.content = 'invalid names';
          break;
        }

        if (!isLowValid(band) || !isHighValid(band)) {
          v.intent = 'warning';
          v.content = 'invalid frequencies';
          break;
        }
      }

      return v;
    },
    [isNameValid, isLowValid, isHighValid],
  );

  return {
    validate,
    isNameValid,
    isLowValid,
    isHighValid,
  };
}
