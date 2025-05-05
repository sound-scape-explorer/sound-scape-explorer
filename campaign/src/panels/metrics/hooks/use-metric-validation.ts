import {type ExtractionDto, type MetricDto} from '@shared/dtos';
import {useCallback} from 'react';
import {createDefaultValidation} from 'src/utils/validation';

export function useMetricValidation() {
  const isImplValid = useCallback(
    (metric: MetricDto, extraction: ExtractionDto) => {
      const impls = extraction.metrics
        .filter((m) => m.index !== metric.index)
        .map((m) => m.impl);
      return !impls.includes(metric.impl);
    },
    [],
  );

  const validate = useCallback(
    (extraction: ExtractionDto) => {
      const l = extraction.metrics.length;

      const v = createDefaultValidation();
      v.intent = l > 0 ? 'success' : 'primary';
      v.content = `${l} ${l > 1 ? 'metrics' : 'metric'}`;

      for (const metric of extraction.metrics) {
        if (!isImplValid(metric, extraction)) {
          v.intent = 'danger';
          v.content = 'invalid impls';
          break;
        }
      }

      return v;
    },
    [isImplValid],
  );

  return {
    validate,
    isImplValid,
  };
}
