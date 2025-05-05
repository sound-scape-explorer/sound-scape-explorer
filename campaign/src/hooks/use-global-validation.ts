import {useMemo} from 'react';
import {useFileValidation} from 'src/hooks/use-file-validation';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import {useExtractionGlobalValidation} from 'src/panels/extractions/hooks/use-extraction-global-validation.ts';

export function useGlobalValidation() {
  const {isValid: isFileValid} = useFileValidation();
  const {isValid: isSettingsValid} = useSettingsValidation();
  const {isValid: areExtractionsValid} = useExtractionGlobalValidation();

  const isValid = useMemo(
    () => isFileValid && isSettingsValid && areExtractionsValid,
    [isFileValid, isSettingsValid, areExtractionsValid],
  );

  return {
    isValid,
  };
}
