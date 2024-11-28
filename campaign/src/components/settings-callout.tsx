import {Callout} from '@blueprintjs/core';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';

export function SettingsCallout() {
  const {isValid} = useSettingsValidation();

  return (
    <Callout intent={isValid ? 'success' : 'danger'}>
      Settings are {isValid ? 'valid' : 'invalid'}
    </Callout>
  );
}
