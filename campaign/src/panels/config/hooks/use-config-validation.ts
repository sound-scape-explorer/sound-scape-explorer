import {useMemo} from 'react';
import {useBandValidation} from 'src/panels/config/hooks/use-band-validation.ts';
import {useIntegrationValidation} from 'src/panels/config/hooks/use-integration-validation.ts';
import {useNeuralExtractorValidation} from 'src/panels/config/hooks/use-neural-extractor-validation.ts';
import {useReducerValidation} from 'src/panels/config/hooks/use-reducer-validation.ts';

export function useConfigValidation() {
  const {validate: validateBands} = useBandValidation();
  const {validate: validateIntegrations} = useIntegrationValidation();
  const {validate: validateExtractors} = useNeuralExtractorValidation();
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
