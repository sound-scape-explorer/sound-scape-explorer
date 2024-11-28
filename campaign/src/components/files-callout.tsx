import {Callout} from '@blueprintjs/core';
import {useFileValidation} from 'src/hooks/use-file-validation.ts';

export function FilesCallout() {
  const {isValid} = useFileValidation();

  return (
    <Callout intent={isValid ? 'success' : 'danger'}>
      Files are {isValid ? 'valid' : 'invalid'}
    </Callout>
  );
}
