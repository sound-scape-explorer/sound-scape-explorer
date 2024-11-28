import {useCallback} from 'react';
import {
  type ConfigBand,
  useBandState,
} from 'src/panels/config/hooks/use-band-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useBandValidation() {
  const {createValidation, collectValues} = useGenericSectionValidation();
  const {bands} = useBandState();

  const isNameValid = useCallback(
    (band: ConfigBand) => {
      if (band.name === '') {
        return false;
      }

      const names = collectValues(bands, band, 'name');

      // noinspection RedundantIfStatementJS
      if (names.includes(band.name)) {
        return false;
      }

      return true;
    },
    [bands, collectValues],
  );

  const isLowValid = useCallback(
    (band: ConfigBand) => band.low < band.high,
    [],
  );
  const isHighValid = useCallback(
    (band: ConfigBand) => band.high > band.low,
    [],
  );

  const validate = useCallback(() => {
    const v = createValidation();

    if (bands.length === 0) {
      v.intent = 'danger';
      v.content = 'empty';
      return v;
    }

    for (const band of bands) {
      if (!isNameValid(band)) {
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
  }, [createValidation, bands, isNameValid, isLowValid, isHighValid]);

  return {
    isNameValid,
    isLowValid,
    isHighValid,
    validate,
  };
}
