import {Callout} from '@blueprintjs/core';
import {useMetricsValidation} from 'src/panels/config/hooks/use-metrics-validation.ts';

export function MetricsCallout() {
  const {isValid} = useMetricsValidation();

  return (
    <Callout intent={isValid ? 'success' : 'danger'}>
      Metrics are {isValid ? 'valid' : 'invalid'}
    </Callout>
  );
}
