import {Callout} from '@blueprintjs/core';
import {useMemo} from 'react';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import {useRangeValidation} from 'src/panels/metrics/hooks/use-range-validation';

export function SettingsCallout() {
  const {isValid: areSettingsValid} = useSettingsValidation();
  const {validate: validateRanges} = useRangeValidation();
  const areRangesValid = useMemo(
    () => validateRanges().intent !== 'danger',
    [validateRanges],
  );

  const isValid = useMemo(
    () => areSettingsValid && areRangesValid,
    [areSettingsValid, areRangesValid],
  );

  return (
    <Callout intent={isValid ? 'success' : 'danger'}>
      Settings are {isValid ? 'valid' : 'invalid'}
    </Callout>
  );
}
