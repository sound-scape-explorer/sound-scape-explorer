import {type ExtractionDto} from '@shared/dtos';
import {useCallback} from 'react';
import {useBandValidation} from 'src/panels/extractions/hooks/use-band-validation';
import {useExtractorValidation} from 'src/panels/extractions/hooks/use-extractor-validation.ts';
import {useIntegrationValidation} from 'src/panels/extractions/hooks/use-integration-validation.ts';
import {useReducerValidation} from 'src/panels/extractions/hooks/use-reducer-validation.ts';
import {useAutoclustersValidation} from 'src/panels/metrics/hooks/use-autoclusters-validation';
import {useMetricValidation} from 'src/panels/metrics/hooks/use-metric-validation.ts';
import {useTrajectoriesValidation} from 'src/panels/metrics/hooks/use-trajectories-validation';

export function useExtractionValidation() {
  const {validate: validateBands} = useBandValidation();
  const {validate: validateIntegrations} = useIntegrationValidation();
  const {validate: validateExtractors} = useExtractorValidation();
  const {validate: validateReducers} = useReducerValidation();
  const {validate: validateMetrics} = useMetricValidation();
  const {validate: validateAutoclusters} = useAutoclustersValidation();
  const {validate: validateTrajectories} = useTrajectoriesValidation();

  const validate = useCallback(
    (extraction: ExtractionDto) => {
      const bands = validateBands(extraction);
      const areBandsValid = bands.intent === 'success';

      const integrations = validateIntegrations(extraction);
      const areIntegrationsValid = integrations.intent === 'success';

      const extractors = validateExtractors(extraction);
      const areExtractorsValid = extractors.intent === 'success';

      const reducers = validateReducers(extraction);
      const areReducersValid = reducers.intent === 'success';

      const metrics = validateMetrics(extraction);
      const areMetricsValid = metrics.intent !== 'danger';

      const autoclusters = validateAutoclusters(extraction);
      const areAutoclustersValid = autoclusters.intent !== 'danger';

      const trajectories = validateTrajectories(extraction);
      const areTrajectoriesValid = trajectories.intent !== 'danger';

      return (
        areBandsValid &&
        areIntegrationsValid &&
        areExtractorsValid &&
        areReducersValid &&
        areMetricsValid &&
        areAutoclustersValid &&
        areTrajectoriesValid
      );
    },
    [
      validateBands,
      validateIntegrations,
      validateExtractors,
      validateReducers,
      validateMetrics,
      validateAutoclusters,
      validateTrajectories,
    ],
  );

  return {
    validate,
  };
}
