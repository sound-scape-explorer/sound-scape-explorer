import {useMemo} from 'react';
import {useAutoclusterValidation} from 'src/panels/metrics/hooks/use-autocluster-validation.ts';
import {useDigesterValidation} from 'src/panels/metrics/hooks/use-digester-validation.ts';
import {useIndexValidation} from 'src/panels/metrics/hooks/use-index-validation.ts';
import {useRangeValidation} from 'src/panels/metrics/hooks/use-range-validation.ts';
import {useTrajectoryValidation} from 'src/panels/metrics/hooks/use-trajectory-validation.ts';

export function useMetricsValidation() {
  const rangeValidation = useRangeValidation();
  const autoclusterValidation = useAutoclusterValidation();
  const digesterValidation = useDigesterValidation();
  const trajectoryValidation = useTrajectoryValidation();
  const extractorValidation = useIndexValidation();

  const isValid = useMemo(() => {
    const intentRanges = rangeValidation.validate().intent;
    const intentAutoclusters = autoclusterValidation.validate().intent;
    const intentDigesters = digesterValidation.validate().intent;
    const intentTrajectories = trajectoryValidation.validate().intent;
    const intentExtractors = extractorValidation.validate().intent;

    return (
      (intentRanges === 'success' || intentRanges === 'primary') &&
      (intentAutoclusters === 'success' || intentAutoclusters === 'primary') &&
      (intentDigesters === 'success' || intentDigesters === 'primary') &&
      (intentTrajectories === 'success' || intentTrajectories === 'primary') &&
      (intentExtractors === 'success' || intentExtractors === 'primary')
    );
  }, [
    rangeValidation,
    autoclusterValidation,
    digesterValidation,
    trajectoryValidation,
    extractorValidation,
  ]);

  return {
    isValid,
  };
}
