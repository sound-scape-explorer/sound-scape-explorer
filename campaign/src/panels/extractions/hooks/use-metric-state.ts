import {type MetricDto} from '@shared/dtos.ts';
import {MetricImpl} from '@shared/enums.ts';
import {useCallback, useMemo} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';

export function useMetricState(extraction: ExtractionConfig) {
  const {updateExtraction} = useExtractionState();

  const metrics = useMemo(() => extraction.metrics, [extraction.metrics]);

  const addMetric = useCallback(() => {
    extraction.metrics.push({
      index: extraction.metrics.length,
      impl: MetricImpl.enum.SILHOUETTE,
    });

    updateExtraction(extraction);
  }, [extraction, updateExtraction]);

  const deleteMetric = useCallback(
    (metric: MetricDto) => {
      const newMetrics = extraction.metrics.filter(
        (m) => m.index !== metric.index,
      );
      newMetrics.forEach((m, index) => {
        m.index = index;
      });
      extraction.metrics = newMetrics;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateIndex = useCallback(
    (metric: MetricDto, index: number) => {
      const newMetrics = [...extraction.metrics];
      const newIndex = metric.index + index;

      if (newIndex < 0 || newIndex >= extraction.metrics.length) {
        return;
      }

      const existing = newMetrics.find((m) => m.index === newIndex);
      const updated = newMetrics.find((m) => m.index === metric.index);
      if (existing && updated) {
        existing.index = metric.index;
        updated.index = newIndex;
      }

      extraction.metrics = newMetrics;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateImpl = useCallback(
    (metric: MetricDto, impl: MetricImpl) => {
      metric.impl = impl;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  return {
    metrics,
    addMetric,
    deleteMetric,
    updateIndex,
    updateImpl,
  };
}
