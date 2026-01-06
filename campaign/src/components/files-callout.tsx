import {Callout} from '@blueprintjs/core';
import {useFileValidation} from 'src/hooks/use-file-validation';

export function FilesCallout() {
  const {isValid} = useFileValidation();

  return (
    <Callout intent={isValid ? 'success' : 'danger'}>
      Files are {isValid ? 'valid' : 'invalid'}
    </Callout>
  );
}
