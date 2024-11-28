import {Callout} from '@blueprintjs/core';
import {useConfigValidation} from 'src/panels/config/hooks/use-config-validation.ts';

export function ConfigCallout() {
  const {isValid} = useConfigValidation();

  return (
    <Callout intent={isValid ? 'success' : 'danger'}>
      Config is {isValid ? 'valid' : 'invalid'}
    </Callout>
  );
}
