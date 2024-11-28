import {useMemo} from 'react';
import {useBandValidation} from 'src/panels/config/hooks/use-band-validation.ts';
import {useExtractorValidation} from 'src/panels/config/hooks/use-extractor-validation.ts';
import {useIntegrationValidation} from 'src/panels/config/hooks/use-integration-validation.ts';
import {useReducerValidation} from 'src/panels/config/hooks/use-reducer-validation.ts';

export function useConfigValidation() {
  const {validate: validateBands} = useBandValidation();
  const {validate: validateIntegrations} = useIntegrationValidation();
  const {validate: validateExtractors} = useExtractorValidation();
  const {validate: validateReducers} = useReducerValidation();

  const isValid = useMemo(
    () =>
      validateBands().intent === 'success' &&
      validateIntegrations().intent === 'success' &&
      validateExtractors().intent === 'success' &&
      validateReducers().intent === 'success',
    [validateBands, validateIntegrations, validateExtractors, validateReducers],
  );

  return {
    isValid,
  };
}
