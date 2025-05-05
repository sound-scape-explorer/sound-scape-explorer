import {Callout} from '@blueprintjs/core';
import {useExtractionGlobalValidation} from 'src/panels/extractions/hooks/use-extraction-global-validation.ts';

export function ExtractionsCallout() {
  const {isValid} = useExtractionGlobalValidation();

  return (
    <Callout intent={isValid ? 'success' : 'danger'}>
      Extractions are {isValid ? 'valid' : 'invalid'}
    </Callout>
  );
}
